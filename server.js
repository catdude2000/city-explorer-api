'use strict';
console.log('server is connected.');

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

// let W_API_KEY = process.env.WEATHER_API_KEY;

app.get('/', (request, response) => {
  response.send('hello from the server.');
});

////////////change from data to api info
app.get('/weather', async (request, response, next) => {
  try {
    let searchQuery = request.query.searchQuery;
    let weatherDataObject = data.find(ele => ele.city_name.toLocaleLowerCase() === searchQuery.toLocaleLowerCase());
    let dataTosend = weatherDataObject.data.map(forecast => new Forecast(forecast));
    // console.log(dataTosend, 'datatosend');
    response.status(200).send(dataTosend);
  } catch (error) {
    next (error);
  }
});
////////////////////
app.get('*', (request, response) => {
  response.send('The route was not found. Error 404');
});

class Forecast{
  constructor(forecastObject) {
    this.date = forecastObject.datetime;
    this.description = forecastObject.weather.description;
  }
}

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
