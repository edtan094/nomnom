// import fetch from 'node-fetch';
const fetch = require('node-fetch');
require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const argon2 = require('argon2');
const pg = require('pg');
const app = express();
const client = require('twilio')(`${process.env.TWILIO_SID}`, `${process.env.TWILIO_AUTH}`);

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

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
      insert into "users" ("username", "hashedPassword")
      values ($1, $2)
      returning "userId", "username", "createdAt"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(200).json(user);
    })
    .catch(error => next(error));
});

const body = {
  method: 'GET',
  headers: {
    Authorization:
      process.env.YELP_AUTHORIZATION
  }
};
app.get('/api/yelp/:preference/:location', (req, res, next) => {
  const { location } = req.params;
  const { preference } = req.params;
  if (!location || !preference) {
    throw new ClientError(400, 'location and preference are required');
  } else if (typeof location !== 'string' || typeof preference !== 'string') {
    throw new ClientError(400, 'location and preferences cannot be numbers');
  }
  fetch(`https://api.yelp.com/v3/businesses/search?categories=${preference}&location=${location}`, body)
    .then(response => response.json())
    .then(data => {
      if (data.total === 0) {
        res.status(200).json(data);
      } else {
        const randomNumber = random(data.businesses.length);
        res.status(200).json(data.businesses[randomNumber]);
      }
    })
    .catch(error => next(error));
});

app.get('/api/yelp/:businessId', (req, res, next) => {
  const { businessId } = req.params;
  fetch(`https://api.yelp.com/v3/businesses/${businessId}/reviews`, body)
    .then(response => response.json())
    .then(reviews => res.status(200).json(reviews))
    .catch(error => next(error));
});

app.post('/api/twilio/:phoneNumber/:address', (req, res, next) => {
  const { phoneNumber } = req.params;
  const { address } = req.params;
  client.messages
    .create({
      body: `${address}`,
      to: `+1${phoneNumber}`, // Text this number
      from: `+1${process.env.TWILIO_PHONE}` // From a valid Twilio number
    })
    .then(message => {
      res.sendStatus(200);
    })
    .catch(error => next(error));
});
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
