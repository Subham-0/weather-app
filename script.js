const API_endpoint = 'https://api.openweathermap.org/data/2.5/weather?';
const API_key = '0c47fd66e8bc33941528482654015245';

const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
};

const fetchData = async (latitude, longitude) => {
    try {
        const response = await fetch(`${API_endpoint}lat=${latitude}&lon=${longitude}&appid=${API_key}`);
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        displayErrorMessage();
    }
};

const displayWeatherData = (weatherData) => {
    const weatherContainer = document.getElementById('weather-container');
    if (!weatherData || !weatherData.name || !weatherData.main || !weatherData.weather) {
        displayErrorMessage();
        return;
    }

    const temperatureCelsius = kelvinToCelsius(weatherData.main.temp).toFixed(2);

    weatherContainer.innerHTML = `
    <h2>Weather in ${weatherData.name}</h2>
    <p class="temperature">${temperatureCelsius}°C</p>
    <p class="description">${weatherData.weather[0].description}</p>
  `;
};

const displayErrorMessage = () => {
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = '<p class="error-message">Error fetching weather data.</p>';
};

document.addEventListener('DOMContentLoaded', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetchData(latitude, longitude);
    }, () => {
        displayErrorMessage();
    });
});