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
const yelp = require('yelp-fusion');
const yelpClient = yelp.client(process.env.YELP_NPM_AUTHORIZATION);
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

app.get('/api/yelp/search/:search/:location', async (req, res, next) => {
  const { search, location } = req.params;
  if (!location || !search) {
    throw new ClientError(400, 'location and preference are required');
  } else if (typeof location !== 'string' || typeof search !== 'string') {
    throw new ClientError(400, 'location and preferences cannot be numbers');
  }
  try {
    const response = await yelpClient.search({
      term: search,
      location: location
    });
    const randomNumber = random(response.jsonBody.businesses.length);
    res.status(200).send(response.jsonBody.businesses[randomNumber]);
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

app.get('/api/yelp/:businessId', async (req, res, next) => {
  const { businessId } = req.params;
  try {
    const response = await fetch(`https://api.yelp.com/v3/businesses/${businessId}/reviews`, body);
    const reviews = await response.json();
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
  }
});

app.post('/api/twilio/:phoneNumber/:address/:name', async (req, res, next) => {
  const { phoneNumber, address, name } = req.params;
  try {
    await client.messages.create({
      body: `Hello, this is a message from NomNom. The location ${name} is at ${address}`,
      to: `+1${phoneNumber}`, // Text this number
      from: `+1${process.env.TWILIO_PHONE}` // From a valid Twilio number
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
  }

});

app.get('/api/yelp/autocomplete/:search', async (req, res, next) => {
  const { search } = req.params;
  console.log('search', search);
  console.log('typeof search', typeof search);
  try {
    const response = await yelpClient.autocomplete({
      text: search
    });
    res.status(200).json(response.jsonBody.terms);
  } catch (err) {
    console.error(err);
  }
});

app.use(authorizationMiddleware);

app.post('/api/bookmarks', async (req, res, next) => {
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
  try {
    const result = await db.query(sql, params);
    const [bookmarks] = result.rows;
    res.status(201).json(bookmarks);
  } catch (err) {
    console.error(err);
  }
});

app.post('/api/bookmarked', async (req, res, next) => {
  const { userId } = req.user;
  if (!userId) {
    throw new ClientError(401, 'invalid credentials');
  }
  const sql = `
  select "businessId"
      from "bookmarks"
      where "userId" = $1`;
  const params = [userId];
  try {
    const result = await db.query(sql, params);
    res.status(201).json(result.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get('/api/bookmarks', async (req, res, next) => {
  const { userId } = req.user;
  if (!userId) {
    throw new ClientError(401, 'invalid credentials');
  }
  const sql = `
  select "businessId", "name", "image", "rating", "address1", "address2", "city", "state", "zipcode", "latitude", "longitude"
    from "bookmarks"
    where "userId" = $1`;
  const params = [userId];
  try {
    const result = await db.query(sql, params);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get('/api/bookmark/:businessId', async (req, res, next) => {
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
  try {
    const result = await db.query(sql, params);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
  }
});

app.delete('/api/bookmark/', async (req, res, next) => {
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
  try {
    await db.query(sql, params);
    res.status(204).json({ deleted: true });
  } catch (err) {
    console.error(err);
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
