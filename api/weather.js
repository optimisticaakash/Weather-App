// This file is located at: api/weather.js

// We need a tool to make HTTP requests from our backend function.
// 'axios' is a popular choice. You'll need to install it by running: npm install axios
const axios = require('axios');

// This is the main function Vercel will run.
// It receives the 'request' (req) from the browser and can send a 'response' (res) back.
module.exports = async (req, res) => {
    
    // 1. Get the city name from the request URL.
    // The frontend will call a URL like: /api/weather?city=Delhi
    // 'req.query.city' will automatically grab the "Delhi" part.
    const city = req.query.city;

    // 2. Get the secret API key.
    // 'process.env.API_KEY' tells Vercel: "Go find the Environment Variable
    // named API_KEY that we will store securely in your dashboard."
    // The key is NOT written in the code.
    const apiKey = process.env.API_KEY; 

    // 3. Construct the full OpenWeatherMap API URL, now including the secret key.
    const fullApiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

    try {
        // 4. Make the request to OpenWeatherMap from the server, not the browser.
        const weatherResponse = await axios.get(fullApiUrl);
        
        // 5. If successful, send the weather data back to the frontend.
        // 'res.status(200)' means "Everything was OK".
        // '.json()' sends the data in a format JavaScript understands.
        res.status(200).json(weatherResponse.data);

    } catch (error) {
        // 6. If anything goes wrong, send back an error message.
        res.status(500).json({ message: "Something went wrong" });
    }
};