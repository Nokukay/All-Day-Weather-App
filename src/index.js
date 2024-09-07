function darkMode() {
  let body = document.querySelector("body");
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
  } else {
    body.classList.add("dark");
  }
}
let themebutton = document.querySelector("button");
themebutton.addEventListener("click", darkMode);

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let currentCondition = document.querySelector("#current-condition");
  let emojiElement = document.querySelector("#current-emoji");
  let humidity = document.querySelector("#humidity-value");
  let wind = document.querySelector("#wind-value");
  let country = document.querySelector("#current-country");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  currentCondition.innerHTML = response.data.condition.description;
  emojiElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="Weather icon" />`;
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = response.data.wind.speed;
  country.innerHTML = response.data.country;

  getForecast(response.data.city);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#enter-city");
  let city = searchInputElement.value;

  let apiKey = "f6ab9e5ca0fe6afo3te0065824dd0370";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function getForecast(city) {
  let apiKey = "f6ab9e5ca0fe6afo3te0065824dd0370";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
    <div class="weather-forecast-day">
          <div class="weather-forecast-date">Sat</div>
          <img src="${day.condition.icon_url}" class="weather-forecast-icon/>
          <div class="weather-forecast-temperatures" >
            <div class="weather-forecast-temperature"><strong>${Math.round(
              day.temperature.maximum
            )}°</strong></div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}°</div> 
            </div>
             </div>
             `;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let searchForm = document.querySelector("#find-city");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

displayForecast();
