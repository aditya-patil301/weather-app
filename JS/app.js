async function fetchWeatherData(city) {
  const apiKey = '717ff386d14e962cc454608e51678dd9'; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === '404' || data.cod === 404) {
      document.getElementById('city-name').textContent = 'City not found!';
      document.getElementById('temperature').textContent = '';
      document.getElementById('weather-description').textContent = '';
      return;
    }

    console.log('Weather data:', data);

    document.getElementById('city-name').textContent = `City: ${data.name}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('weather-description').textContent = `Weather: ${data.weather[0].description}`;

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

function getUserLocation() {
    return {
        latitude: 22.7196,
        longitude: 75.8577
    };
}



function generateWeatherForecast(city, latitude, longitude) {
    const weatherConditions = ["Sunny", "Cloudy", "Rainy", "Snowy"];
    const forecast = [];
    const currentDate = new Date();

    for (let i = 0; i < 3; i++) {

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Months are 0-based
        const year = currentDate.getFullYear();

        const temperature = Math.random() * 45 - 10; // -10°C to 35°C
        const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        const humidity = Math.random() * 100;
        const windSpeed = Math.random() * 20;

        forecast.push({
            date: `${month}/${day}/${year}`,
            temperature: temperature.toFixed(1),
            condition,
            humidity: humidity.toFixed(1),
            windSpeed: windSpeed.toFixed(1),
            latitude,
            longitude
        });

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return forecast;
}


const city = "Indore";
const userLocation = getUserLocation();
const forecastData = generateWeatherForecast(city, userLocation.latitude, userLocation.longitude);
console.log(forecastData);