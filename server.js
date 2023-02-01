'use strict';
const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');

const cors = require('cors')
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5005;

app.get('/', (request, response)=>{
  response.send('Hello from our server HOME route / !!');
});



/////////////////////////////////

app.get('/weather', (request, response) => {
  try {
    let dataRequest = request.query.data;
    let dataToInstantiate = data.find(weather => weather.dataRequest === dataRequest);
    let dataToSend = new Forecast(dataToInstantiate);
    console.log(dataToSend,  'got back');
    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }
});


function weatherHandler(request, response) {

}

class Forecast (date, description) {
  constructor(forecastObject){
    this.dataRequest = forecastObject.dataRequest;
  }
}

/////////////////////////////////////////////////

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log('Listening on PORT ${PORT)'));
