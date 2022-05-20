/**
 * @file server.js
 * @Author Code Fellows/Mike Pace
 */

const express = require('express');  //load the library
const app = express(); // create an object
const port = process.env.PORT || 5000;
const weatherData = require('./data/weather.json');

/**
 * 
 * @param {number} lat - latitude
 * @param {number} lon - longitude
 * @param {string} searchQ - city name
 * @returns {array} -array of weather forecasts
 */
function getCity(lat, lon ,searchQ){
  const results = [];
  for (let i=0; i< weatherData.length; i++){
    if searchQ = ('Seattle' || 'Paris' || 'Amman'){
    
    }
  }
  return results;
}


app.get('/weather', (req, res) => {
  let lat=req.query.lat;
  let lon=req.query.lon;
  let searchQ=req.query.searchQ;
  let results = getCity(lat, lon, searchQ);
  res.send({ express: results });
});

app.listen(port, () => {
  console.log('Listening on port ', port);
});
