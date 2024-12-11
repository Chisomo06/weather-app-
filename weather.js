const API_KEY = '4b410688e928f5e065268879aaf7e68a '; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const forecastContainer = document.getElementById('forecast-container');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) fetchWeatherData(city);
});

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`);
        const data = await response.json();
        if (data.cod !== '200') throw new Error(data.message);
        updateBackground(data.list[0].weather[0].main); // Update the background
        displayForecast(data);
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function displayForecast(data) {
    forecastContainer.innerHTML = '';
    const forecastList = data.list.filter((_, index) => index % 8 === 0); // Get 5 days of data

    forecastList.forEach(forecast => {
        const date = new Date(forecast.dt_txt).toLocaleDateString();
        const temp = Math.round(forecast.main.temp);
        const description = forecast.weather[0].description;
        const icon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <h3>${date}</h3>
            <img class="weather-icon" src="${icon}" alt="${description}">
            <p><strong>${temp}°C</strong></p>
            <p>${description}</p>
        `;
        forecastContainer.appendChild(card);
    });
}

function updateBackground(weatherCondition) {
    const body = document.body;
    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            body.style.background = 'linear-gradient(to bottom, #f9d423, #ff4e50)';
            break;
        case 'clouds':
            body.style.background = 'linear-gradient(to bottom, #bdc3c7, #2c3e50)';
            break;
        case 'rain':
            body.style.background = 'linear-gradient(to bottom, #005bea, #00c6fb)';
            break;
        case 'snow':
            body.style.background = 'linear-gradient(to bottom, #e6dada, #274046)';
            break;
        default:
            body.style.background = 'linear-gradient(to bottom, #1e3c72, #2a5298)';
    }
}
