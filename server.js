'use strict';
console.log('server is connected.');
const axios = require('axios').default;
////////^^^^^^correct?
const express = require('express');
require('dotenv').config();
// let data = require('./data/weather.json');
const cors = require('cors');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

let W_API_KEY = process.env.WEATHER_API_KEY;

app.get('/', (request, response) => {
  response.send('hello from the server.');
});


app.get('/weather', async (request, response, next) => {
  try {
    // const searchQuery= request.query.searchQuery;
    // console.log(searchQuery, 'searchqy');
    let lat = request.query.lat;
    let lon= request.query.lon;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${W_API_KEY}`;

    console.log(url, 'url');
    let weatherData = await axios.get(url);
    // let weatherDataObject = request.query.searchQuery.toLocaleLowerCase();
   
    // let weatherDataObject = weatherData.find(ele => ele.city_name.toLocaleLowerCase() === searchQuery);
    // console.log(weatherDataObject, 'weatherdtaobject');
    ////^^^^^^^^^^^^^^^^replace?

    let dataTosend = weatherData.map(forecast => new Forecast(forecast));
    console.log(dataTosend, 'datatosend');
    response.status(200).send(dataTosend);
  } catch (error) {
    next;
    (error);
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
