const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");
const weatherIcon = document.getElementById("weatherIcon");
const cityName = document.getElementById("cityName");
const weatherCondition = document.getElementById("weatherCondition");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const errorMsg = document.getElementById("errorMsg");

async function fetchWeather(city) {
  errorMsg.style.display = "none";
  weatherCard.style.display = "none";

  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=5d54df1d472941c3b0475532242501&q=${city}&aqi=no`;
    const res = await fetch(url);

    if (!res.ok) throw new Error("City not found");
    const data = await res.json();

    // Set data from API response
    cityName.textContent = `${data.location.name}, ${data.location.region} (${data.location.country})`;
    weatherCondition.textContent = data.current.condition.text;
    temperature.textContent = `${data.current.temp_c}°C`;
    humidity.textContent = `Humidity: ${data.current.humidity}%`;
    wind.textContent = `Wind: ${data.current.wind_kph} km/h (${data.current.wind_dir})`;
    weatherIcon.src = "https:" + data.current.condition.icon;
    weatherIcon.style.display = "block";

    weatherCard.style.display = "flex";
  } catch (err) {
    errorMsg.textContent = "City not found. Please try again.";
    errorMsg.style.display = "block";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

// Optionally, show weather for a default city on load
fetchWeather("New Delhi");
