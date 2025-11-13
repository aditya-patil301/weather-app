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
