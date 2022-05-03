// import fetch from 'node-fetch';
const fetch = require('node-fetch');
require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const pg = require('pg');
const app = express();
const client = require('twilio')(`${process.env.TWILIO_SID}`, `${process.env.TWILIO_AUTH}`);
const authorizationMiddleware = require('./authorization-middleware');

function random(length) {
  return Math.floor(Math.random() * length);
}

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(staticMiddleware);
const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.post('/api/auth/sign-up', async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  try {
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "users" ("username", "hashedPassword")
      values ($1, $2)
      returning "userId", "username", "createdAt"
      `;
    const params = [username, hashedPassword];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  try {
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = user;
    const isMatching = await argon2.verify(hashedPassword, password);
    if (!isMatching) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.status(200).json({ token, user: payload });
  } catch (err) {
    console.error(err);
  }
});

const body = {
  method: 'GET',
  headers: {
    Authorization:
      process.env.YELP_AUTHORIZATION
  }
};
app.get('/api/yelp/:preference/:location', async (req, res, next) => {
  const { location } = req.params;
  const { preference } = req.params;
  if (!location || !preference) {
    throw new ClientError(400, 'location and preference are required');
  } else if (typeof location !== 'string' || typeof preference !== 'string') {
    throw new ClientError(400, 'location and preferences cannot be numbers');
  }
  fetch(`https://api.yelp.com/v3/businesses/search?categories=${preference}&location=${location}`, body);
  try {
    const result = await fetch(`https://api.yelp.com/v3/businesses/search?categories=${preference}&location=${location}`, body);
    const data = await result.json();
    if (data.total === 0) {
      res.status(200).json(data);
    } else {
      const randomNumber = random(data.businesses.length);
      res.status(200).json(data.businesses[randomNumber]);
    }
  } catch (err) {
    console.error(err);
  }
});

app.get('/api/yelp/:businessId', (req, res, next) => {
  const { businessId } = req.params;
  fetch(`https://api.yelp.com/v3/businesses/${businessId}/reviews`, body)
    .then(response => response.json())
    .then(reviews => res.status(200).json(reviews))
    .catch(error => next(error));
});

app.post('/api/twilio/:phoneNumber/:address/:name', (req, res, next) => {
  const { phoneNumber, address, name } = req.params;
  client.messages
    .create({
      body: `Hello, this is a message from NomNom. The location ${name} is at ${address}`,
      to: `+1${phoneNumber}`, // Text this number
      from: `+1${process.env.TWILIO_PHONE}` // From a valid Twilio number
    })
    .then(message => {
      res.status(200).json({ success: true });
    })
    .catch(error => next(error));
});

app.use(authorizationMiddleware);

app.post('/api/bookmarks', (req, res, next) => {
  const { userId } = req.user;
  if (!userId) {
    throw new ClientError(401, 'invalid credentials');
  }
  const { id: businessId, image, name, rating } = req.body.result;
  const { lat: latitude, lng: longitude } = req.body.maps;
  const { address1, address2, city, state, zip_code: zipcode } = req.body.result.location;
  const sql = `
      insert into "bookmarks" ("userId", "businessId", "name", "image", "rating", "address1", "address2", "city", "state", "zipcode", "latitude", "longitude")
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      returning "userId", "businessId", "name", "image", "rating", "address1", "address2", "city", "state", "zipcode", "latitude", "longitude" "createdAt"
      `;
  const params = [userId, businessId, name, image, rating, address1, address2, city, state, zipcode, latitude, longitude];
  return db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(error => next(error));
});

app.post('/api/bookmarked', (req, res, next) => {
  const { userId } = req.user;
  if (!userId) {
    throw new ClientError(401, 'invalid credentials');
  }
  const sql = `
  select "businessId"
      from "bookmarks"
      where "userId" = $1`;
  const params = [userId];
  return db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(error => next(error));
});

app.get('/api/bookmarks', (req, res, next) => {
  const { userId } = req.user;
  if (!userId) {
    throw new ClientError(401, 'invalid credentials');
  }
  const sql = `
  select "businessId", "name", "image", "rating", "address1", "address2", "city", "state", "zipcode", "latitude", "longitude"
    from "bookmarks"
    where "userId" = $1`;
  const params = [userId];
  return db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(error => next(error));
});

app.get('/api/bookmark/:businessId', (req, res, next) => {
  const { userId } = req.user;
  if (!userId) {
    throw new ClientError(401, 'invalid credentials');
  }
  const { businessId } = req.params;
  const sql = `
  select "businessId", "name", "image", "rating", "address1", "address2", "city", "state", "zipcode", "latitude", "longitude"
    from "bookmarks"
    where "businessId" = $1`;
  const params = [businessId];
  return db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(error => next(error));
});

app.delete('/api/bookmark/', (req, res, next) => {
  const { businessId } = req.body;
  const { userId } = req.user;
  if (!userId) {
    throw new ClientError(401, 'invalid credentials');
  }
  const sql = `
  delete from "bookmarks"
 where "businessId" = $1
   and "userId"    = $2`;
  const params = [businessId, userId];
  return db.query(sql, params)
    .then(result => {
      res.status(204).json({ deleted: true });
    })
    .catch(error => next(error));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
