'use strict';
console.log('server is connected.');
const axios = require('axios').default;
const express = require('express');
require('dotenv').config();
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
    const searchQuery= request.query.city;
    console.log(searchQuery, 'searchqy');
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${W_API_KEY}`;
    let weatherData = await axios.get(url);
    console.log(weatherData.data, 'weatherdata');
    // let weatherDataObject = request.query.searchQuery.toLocaleLowerCase();
    // let weatherDataObject = weatherData.find(ele => ele.city_name.toLocaleLowerCase() === searchQuery);
    // console.log(weatherDataObject, 'weatherdtaobject');
    let dataTosend = weatherData.data.map(forecast => new Forecast(forecast));
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
    // this.coord = forecastObject.coord;
    //Need different variable to match openweather?
  }
}

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
