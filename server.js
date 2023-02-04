'use strict';
console.log('server is connected.');

const express = require('express');

require('dotenv').config();
let data = require('./data/weather.json');

const cors = require('cors');

// const axios = require('axios');

const app = express();
app.use(cors());


///////////////////////////////
// let cache={}
// async function getStuff(req, res, next){
// if() {

// }else {

//  }
//  try {
//   let searchQueryFromFrontEnd = req.query.searchQuery;
//   let key = searchQueryFromFrontEnd = '-Data';
//   let acceptableTimeTiCache = 1000 * 60 * 60 * 24 * 30;
//   console.log(acceptableTimeTiCache, 'accepttimetocache');
//   // let testTimeToCache = 1000 * 10;

//   if(cache[key]   && Date.now() - cache[key]  ) {
//     console.log('is in cache')
//   }else {
//     let exampurl = ***,
//     let results = await axios.get(exampurl);
//   };
//   // console.log(cache, 'cache');
//  } catch (error) {

//  }
// }
/////////////////////////////


const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('hello from the server.');
});

app.get('/weather', async (request, response) => {
  console.log(request.query, 'request');
  let lat = request.query.lat;
  let lon = request.query.lon;
  let searchQuery = request.query.searchQuery;
  console.log(searchQuery, 'searchquery');
  let cityLat = data.find(ele => ele.lat === lat);
  let cityLon = data.find(ele => ele.lon === lon);
  let citySearch = data.find(ele => ele.city_name === searchQuery);
  // let citySearch = data.find(ele => console.log(ele.city_name, 'ele'));
  // console.log(, 'citysearch');
  response.send('/weather');
  let dataTosend = new Forecast(citySearch, cityLon, cityLat);
  response.send(dataTosend);
  // let results = await axios.get(url)

});
//could be wrong url
// const weathUrl = `http://api.weatherbit.io/v2.0/forecast/daily?city=Seattle&key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=5&units=I`;

app.post();

class Forecast{
  constructor(forecastObject) {
    this.datetime = data.datetime;
    this.description = forecastObject.description;
  }
}



app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
