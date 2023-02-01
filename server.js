const express = require('express');
require('dotenv').config();
let data = require('./');

const cors = require('cors')
const app = express();
app.use(cors());
const Port = process.env.PORT || 5005;

app.get('/', (request, response)=>{
    response.send('Hello from our server HOME route / !!');
});

app.use('*', (request, response))

app.listen(PORT, () => console.log('Listebibg on PORT ${PORT'));
