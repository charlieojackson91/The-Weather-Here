const express   = require('express');
const app       = express();
const fetch     = require('node-fetch');
const DataStore = require('nedb');

require('dotenv').config();

const apiKey = process.env.API_KEY;

console.log(process.env.API_KEY, apiKey);



app.listen(3000, () => console.log('listening at port 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

// create the database
const database = new DataStore('database.db');
database.loadDatabase();

// post route to server
app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp  = timestamp;

    console.log(data);
    database.insert(data);
    response.json(data);
});

// get route to server
app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
        }
        response.json(data);
    });
});




getCity = async (lat,lon) => {
    const geoAPIURL      = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${lon}`;
    const fetchResponse  = await fetch(geoAPIURL);
    const data           = await fetchResponse.json();
    const key            = data.Key;
    const city           = data.LocalizedName;

    console.log(key, city);
    return {key, city};
}

getWeather = async (cityKey) => {
    const weatherAPI = `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`;
    const response   = await fetch(weatherAPI);
    const data       = await response.json();

    return data[0];
}

// weather route
app.get('/weather/:latlon', async (request, response) => {
    const latlon      = request.params.latlon.split(',');
    const lat         = latlon[0];
    const lon         = latlon[1];
    const {key, city} = await getCity(lat,lon);

    weatherReponse = await getWeather(key);
    weatherReponse.city = city;
    response.json(weatherReponse);  
});

