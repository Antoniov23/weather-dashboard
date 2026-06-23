# 🌤️ Weather Dashboard

A responsive weather app that fetches live weather data and a 5-day forecast 
for any city in the world using the OpenWeatherMap API.

🔗 **Live Demo:** [Click here to view](1weatherdashboard.netlify.app)

---

## 🖥️ What It Does

- Search any city and instantly see live weather conditions
- Displays temperature, feels like, humidity, and weather condition
- Shows a 5-day forecast with daily high temperatures
- Background color dynamically changes based on temperature
- Weather emojis update based on current conditions (rain, snow, sun, etc.)
- Handles errors gracefully when a city isn't found
- Shows a loading state while data is being fetched

---

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and layout |
| CSS3 | Styling, responsive design, dynamic backgrounds |
| JavaScript (ES6+) | App logic, DOM manipulation, API calls |
| OpenWeatherMap API | Live weather and forecast data |
| Netlify | Free deployment and hosting |

---

## 💡 Concepts I Used

- `fetch()` and `async/await` to request live data from an API
- `Promise.all` to fetch current weather and forecast simultaneously
- `try/catch/finally` for error handling and loading states
- `classList.add/remove` to show and hide elements dynamically
- `.map()` and `.join()` to build HTML from arrays of data
- Template literals to build dynamic API URLs and HTML strings
- DOM manipulation to update the page without reloading

---

## 📸 Screenshot

![Weather Dashboard Screenshot](screenshot.png)



---

## 🚀 How to Run Locally

1. Clone this repo
   
   git clone https://github.com/Antoniov23/weather-dashboard.git

2. Get a free API key from [openweathermap.org](https://openweathermap.org)

3. Open `script.js` and replace `'your_key_here'` with your API key

4. Open `index.html` in your browser

---

## 👨‍💻 Author

**Antonio Vazquez**  
[GitHub](https://github.com/Antoniov23) • [LinkedIn](https://linkedin.com/in/antonio-vazquez-1a8a45212)
