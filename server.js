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



app.get('/weather', async (request, response) => {
  try {
  // console.log(request.query, 'request');
  // const weathUrl = `http://api.weatherbit.io/v2.0/forecast/daily?city=${}&key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=5&units=I`;
  // let results = await axios.get(weathUrl)
  

  let lat = request.query.lat;
  let lon = request.query.lon;
  let searchQueryDone = request.query.searchQuery;
  console.log(searchQuery, 'searchquery');
  let cityLat = data.find(ele => ele.lat === lat);
  let cityLon = data.find(ele => ele.lon === lon);
  let citySearch = data.find(ele => ele.searchQuery === searchQuery);
  // let citySearch = data.find(ele => console.log(ele.city_name, 'ele'));
  // console.log(, 'citysearch');
  let dataTosend = forecastObject.data.map(forecast => new Forecast(forecast));
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
    this.datetime = forecastObject.datetime;
    this.description = forecastObject.description;
  }
}


app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
