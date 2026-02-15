// weather_axios.js
require('dotenv').config();
const axios = require('axios'); // Nécessite 'npm install axios'

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

function getWeatherDataAxios(city, callback) {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;

    axios.get(url)
        .then((response) => {
            // Axios renvoie les données directement dans .data
            callback(null, response.data);
        })
        .catch((error) => {
            callback(error, null);
        });
}

function displayWeather(error, data) {
    if (error) {
        console.error("Erreur Axios :", error.message);
    } else {
        console.log(`--- Météo (Via Axios) à ${data.name} ---`);
        console.log(`Description : ${data.weather[0].description}`);
        console.log(`Température : ${data.main.temp}°C`);
        console.log(`Humidité    : ${data.main.humidity}%`);
    }
}

getWeatherDataAxios("Sousse", displayWeather);