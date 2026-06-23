const input = document.getElementById("city-input");
const button = document.getElementById("search-btn");
const weatherCard = document.getElementById("weather-card");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const errorMsg = document.getElementById("error-msg");

const API_KEY = "your_key_here";

function getWeatherEmoji(conditionText) {
  const c = conditionText.toLowerCase();
  if (c.includes("thunder")) return "⛈️";
  if (c.includes("rain") || c.includes("drizzle")) return "🌧️";
  if (c.includes("snow")) return "❄️";
  if (c.includes("cloud")) return "☁️";
  if (c.includes("mist") || c.includes("fog")) return "🌫️";
  if (c.includes("clear")) return "☀️";
  return "🌤️";
}

function setBackground(temp) {
  if (temp >= 90) {
    document.body.style.background =
      "linear-gradient(135deg, #7f1d1d, #dc2626)";
  } else if (temp >= 70) {
    document.body.style.background =
      "linear-gradient(135deg, #0f172a, #1e3a5f)";
  } else if (temp >= 50) {
    document.body.style.background =
      "linear-gradient(135deg, #1e293b, #334155)";
  } else {
    document.body.style.background =
      "linear-gradient(135deg, #0f172a, #1e40af)";
  }
}

// This takes the raw forecast array (one entry per 3 hours)
// and filters it down to just ONE entry per day at noon.
// We use the "dt_txt" field the API gives us — it looks like
// "2026-06-23 12:00:00" — and we just grab entries with 12:00
function getDailyForecasts(list) {
  return list.filter((item) => item.dt_txt.includes("12:00:00")).slice(0, 5);
}

// This builds the forecast HTML dynamically using .map()
// .map() loops through an array and transforms each item
// into something new — here we turn weather data into HTML strings
// then .join('') stitches them into one big string with no commas
function buildForecastHTML(dailyList) {
  return dailyList
    .map((item) => {
      const date = new Date(item.dt_txt);

      // .toLocaleDateString with 'weekday: short' gives us "Mon", "Tue" etc
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const temp = Math.round(item.main.temp);
      const emoji = getWeatherEmoji(item.weather[0].description);

      return `
      <div class="forecast-day">
        <div class="day-name">${dayName}</div>
        <div class="day-emoji">${emoji}</div>
        <div class="day-temp">${temp}°F</div>
      </div>
    `;
    })
    .join("");
}

async function getWeather() {
  const city = input.value.trim();
  if (!city) return;

  button.textContent = "Loading...";
  button.disabled = true;

  // We now fetch TWO endpoints at the same time using Promise.all
  // Promise.all takes an array of fetches and waits for ALL of them
  // to finish before moving on — faster than fetching one by one
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`;

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl),
    ]);

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    if (currentData.cod === "404") {
      errorMsg.classList.remove("hidden");
      weatherCard.classList.add("hidden");
      return;
    }

    const temp = Math.round(currentData.main.temp);
    const feelsLike = Math.round(currentData.main.feels_like);
    const conditionText = currentData.weather[0].description;
    const emoji = getWeatherEmoji(conditionText);

    cityName.textContent = currentData.name;
    temperature.textContent = `${temp}°F`;
    condition.textContent = `${emoji} ${conditionText}`;
    document.getElementById("feels-like").textContent =
      `Feels like: ${feelsLike}°F`;
    humidity.textContent = `💧 Humidity: ${currentData.main.humidity}%`;

    // Build and inject the forecast
    const dailyList = getDailyForecasts(forecastData.list);
    document.getElementById("forecast").innerHTML =
      buildForecastHTML(dailyList);

    setBackground(temp);
    weatherCard.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  } catch (error) {
    errorMsg.classList.remove("hidden");
    weatherCard.classList.add("hidden");
  } finally {
    button.textContent = "Search";
    button.disabled = false;
  }
}

button.addEventListener("click", getWeather);
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") getWeather();
});
