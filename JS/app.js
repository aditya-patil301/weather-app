async function fetchWeatherData(city) {
    const apiKey = '717ff386d14e962cc454608e51678dd9';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod == 404) {
            document.getElementById('city-name').textContent = 'City not found!';
            document.getElementById('temperature').textContent = '';
            document.getElementById('weather-description').textContent = '';
            return;
        }

        console.log('Weather data:', data);

        document.getElementById('city-name').textContent = `City: ${data.name}`;
        document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById('weather-description').textContent =
            `Weather: ${data.weather[0].description}`;

    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('city-name').textContent = 'Error fetching data!';
    }
}

document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value.trim();
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    fetchWeatherData(city);
});


async function fetchWeatherByCoordinates(lat, lon) {
    const apiKey = '717ff386d14e962cc454608e51678dd9';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log("Weather by Coordinates:", data);

        document.getElementById("city-name").textContent = `City: ${data.name}`;
        document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById("weather-description").textContent =
            `Weather: ${data.weather[0].description}`;

    } catch (error) {
        console.error("Error fetching coordinate weather:", error);
    }
}

function getUserLocation() {
    return {
        latitude: 40.7128,
        longitude: -74.0060
    };
}

const userLocation = getUserLocation();

function generateWeatherForecast(city, latitude, longitude) {

    if (typeof city !== "string" || city.trim() === "") {
        throw new Error("Invalid city name. Please provide a valid city.");
    }

    const conditions = ["Sunny", "Cloudy", "Rainy", "Snowy"];
    const forecast = [];
    const currentDate = new Date();

    for (let i = 0; i < 3; i++) {

        const date = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
        const temperature = (Math.random() * 45 - 10).toFixed(1);
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        const humidity = (Math.random() * 100).toFixed(1);
        const windSpeed = (Math.random() * 20).toFixed(1);

        forecast.push({
            date,
            temperature,
            condition,
            humidity,
            windSpeed,
            latitude,
            longitude
        });

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return forecast;
}

function getWeatherIcon(condition) {
    switch (condition) {
        case "Sunny": return "☀️";
        case "Cloudy": return "☁️";
        case "Rainy": return "🌧️";
        case "Snowy": return "❄️";
        default: return "❓";
    }
}

const forecastData = generateWeatherForecast(
    "Indore",
    userLocation.latitude,
    userLocation.longitude
);

forecastData.forEach(day => {
    const icon = getWeatherIcon(day.condition);

    console.log("---------------------------------");
    console.log(`Date: ${day.date}`);
    console.log(`Condition: ${day.condition} ${icon}`);
    console.log(`Temperature: ${day.temperature}°C`);
    console.log(`Humidity: ${day.humidity}%`);
    console.log(`Location: (${day.latitude}, ${day.longitude})`);
});
