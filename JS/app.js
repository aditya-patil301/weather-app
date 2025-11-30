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

let isFahrenheit = false;
let favoriteCities = JSON.parse(localStorage.getItem("favoriteCities")) || [];

document.getElementById("add-fav-btn").addEventListener("click", () => {
    const city = document.getElementById("city-name").textContent.replace("City: ", "").trim();

    if (!city) return alert("Search a city first");

    if (favoriteCities.some(c => c.name === city)) {
        alert("Already in favorites");
        return;
    }

    favoriteCities.push({ name: city });
    localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));

    displayFavoriteCities();
});

function removeFavoriteCity(cityName) {
    favoriteCities = favoriteCities.filter(c => c.name !== cityName);
    localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
    displayFavoriteCities();
}

function displayFavoriteCities() {
    const box = document.getElementById("favorite-cities");
    box.innerHTML = "";

    favoriteCities.forEach(city => {
        const btn = document.createElement("button");
        btn.textContent = city.name;
        btn.onclick = () => fetchWeatherData(city.name);

        const removeBtn = document.createElement("span");
        removeBtn.textContent = "Remove";
        removeBtn.style.cursor = "pointer";
        removeBtn.onclick = () => removeFavoriteCity(city.name);

        const wrapper = document.createElement("div");
        wrapper.appendChild(btn);
        wrapper.appendChild(removeBtn);

        box.appendChild(wrapper);
    });
}

displayFavoriteCities();

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

        const temperature = Math.random() * 45 - 10; // C° (raw number)
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        const humidity = Math.random() * 100;

        forecast.push({
            date,
            temperature,
            condition,
            humidity,
            latitude,
            longitude
        });

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return forecast;
}

let forecastData = generateWeatherForecast(
    "Indore",
    userLocation.latitude,
    userLocation.longitude
);

function getWeatherIcon(condition) {
    switch (condition) {
        case "Sunny": return "☀️";
        case "Cloudy": return "☁️";
        case "Rainy": return "🌧️";
        case "Snowy": return "❄️";
        default: return "❓";
    }
}

function convertTemperature(tempInCelsius, toFahrenheit = true) {
    if (toFahrenheit) {
        return (tempInCelsius * 9/5) + 32; // C → F
    }
    return tempInCelsius; // Keep Celsius
}

function toggleTemperatureUnit() {
    isFahrenheit = !isFahrenheit;
    console.log("\n*** Unit Toggled ***");
    displayForecast();
}

function displayForecast() {
    console.clear();
    console.log("----- 3-Day Weather Forecast -----");

    forecastData.forEach(day => {
        const icon = getWeatherIcon(day.condition);

        let displayedTemp;
        if (isFahrenheit) {
            displayedTemp = convertTemperature(day.temperature, true).toFixed(1) + "°F";
        } else {
            displayedTemp = day.temperature.toFixed(1) + "°C";
        }

        console.log("---------------------------------");
        console.log(`Date: ${day.date}`);
        console.log(`Condition: ${day.condition} ${icon}`);
        console.log(`Temperature: ${displayedTemp}`);
        console.log(`Humidity: ${day.humidity.toFixed(1)}%`);
        console.log(`Location: (${day.latitude}, ${day.longitude})`);
    });
}

function refreshWeather() {
    console.log("\n*** Forecast Refreshed ***");
    forecastData = generateWeatherForecast(
        "Indore",
        userLocation.latitude,
        userLocation.longitude
    );
    displayForecast();
}

displayForecast();