/**
 * @file server.js
 * @Author Code Fellows/Mike Pace
 */

const express = require('express');  //load the library
const app = express(); // create an object
const port = process.env.PORT || 5000;
// const data = require('./data/weather.json');

// data.find(element );

// app.get('/weather', (req, res) => {
//   let lat=req.query.lat;
//   let lon=req.query.lon;
//   let searchQ=req.query.searchQ;
//   res.send({ express: searchQ });
// });

/**
 *  catchall so place it last or it wil catch all the
 * requests.
 */
app.get('/weather', (req, res) => {
  res.send({ express: req.query.location });
});

app.listen(port, () => {
  console.log('Listening on port ', port);
});
