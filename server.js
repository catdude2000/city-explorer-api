'use strict';
console.log('server is connected.');

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');

// const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('hello from the server.');
});


app.get('/weather', async (request, response, next) => {
  try {
    // const weathUrl =  `http://api.weatherbit.io/v2.0/forecast/daily?city=Seattle&key=${WEATHER_API_KEY}`
    // let results = await axios.get(weathUrl)
    // let weatherData = await axios.get(weathUrl)
    let lat = request.query.lat;
    console.log(lat, 'lat');
    // let lon = request.query.lon;
    let searchQuery = request.query.searchQuery;
    console.log(searchQuery, 'searchquery');

    let weatherDataObject = data.find(ele => ele.city_name.toLocaleLowerCase() === searchQuery.toLocaleLowerCase());
    console.log(weatherDataObject, 'weatherdataobj');
    // let cityLat = data.find(ele => ele.lat === lat);

    let dataTosend = weatherDataObject.data.map(forecast => new Forecast(forecast));
    console.log(dataTosend, 'datatosend');

    response.status(200).send(dataTosend);
  } catch (error) {
    next (error);
  }
});

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
