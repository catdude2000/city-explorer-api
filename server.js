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
let M_API_KEY = process.env.MOVIE_API_KEY;

app.get('/', (request, response) => {
  response.send('hello from the server.');
});

app.get('/weather', async (request, response, next) => {
  try {
    const searchQuery= request.query.city;
    // console.log(searchQuery, 'searchqy');
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchQuery}&appid=${W_API_KEY}`;
    let weatherData = await axios.get(url);
    console.log(weatherData.data.city, 'weatherdata');
    let dataTosend = weatherData.data.city.map(forecast => new Forecast(forecast));
    console.log(dataTosend, 'datatosend');
    response.status(200).send(dataTosend);
  } catch (error) {
    next;
    (error);
  }
});
////////////////////
app.get('/movies', async (request, response, next) => {
  try {
    const searchQuery = request.query.city;
    let mUrl = `https://api.themoviedb.org/3/search/movie?${M_API_KEY}=###&query=${searchQuery} `;
    console.log(mUrl, 'url');
    let movieData = await axios.get(mUrl);
    let movieDataTosend = movieData.data.map(movie => new Movie(movie));
    console.log(movieDataTosend, 'moviedatatosend');
    response.status(200).send(movieDataTosend);
  } catch (error) {
    next;
    (error);
  }
});



app.get('*', (request, response) => {
  response.send('The route was not found. Error 404');
});

class Movie{
  constructor(movieObject) {
    this.title = movieObject.results.original_title;
  }
}


class Forecast{
  constructor(forecastObject) {
    // this.dt_txt = forecastObject.list.dt_txt;
    // this.description = forecastObject.weather.description;
    this.coord = forecastObject.coord;
    //Need different variable to match openweather?
  }
}

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
