// import fetch from 'node-fetch';
const fetch = require('node-fetch');
require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const app = express();
function random(length) {
  return Math.floor(Math.random() * length);
}

app.use(staticMiddleware);

const body = {
  method: 'GET',
  headers: {
    Authorization:
      process.env.YELP_AUTHORIZATION
  }
};
app.get('/yelp/:preference/:location', (req, res) => {
  const { location } = req.params;
  const { preference } = req.params;
  fetch(`https://api.yelp.com/v3/businesses/search?categories=${preference}&location=${location}`, body)
    .then(response => response.json())
    .then(data => {
      const randomNumber = random(data.businesses.length);
      return data.businesses[randomNumber];
    })
    .catch(error => console.error(error));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
