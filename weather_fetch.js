// weather_fetch.js
require('dotenv').config();
const API_KEY = process.env.API_KEY; // Chargée depuis .env
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Fonction demandée avec le pattern "callback"
function getWeatherData(city, callback) {
    // 5. Modification pour métrique (units=metric) et français (lang=fr)
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;

    fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Erreur HTTP: ${res.status}`);
            }
            return res.json();
        })
        .then((weatherData) => callback(null, weatherData))
        .catch((error) => callback(error, null));
}

// 4. Fonction callback pour afficher les paramètres spécifiques
function displayWeather(error, data) {
    if (error) {
        console.error("Erreur lors de la récupération :", error.message);
    } else {
        console.log(`--- Météo à ${data.name} ---`);
        // Affichage des paramètres demandés
        console.log(`Description : ${data.weather[0].description}`);
        console.log(`Température : ${data.main.temp}°C`);
        console.log(`Humidité    : ${data.main.humidity}%`);
    }
}

// Exécution pour la ville de Sousse
getWeatherData("Sousse", displayWeather);