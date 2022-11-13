// Feature 1: Current Data & Time
function formatDate() {
  let today = now.getDate();

  let currentDate = document.querySelector("#current-date");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satday",
  ];
  let day = days[now.getDay()];

  let months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let year = now.getFullYear();

  currentDate.innerHTML = `${day}, ${month} ${today}, ${year}`;
}
let now = new Date();
let currentDate = document.querySelector("#current-date");
formatDate();

function formatTime() {
  let currentTime = document.querySelector("#current-time");

  let hours = now.getHours();

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  currentTime.innerHTML = `${hours}:${minutes}`;
}
let currentTime = document.querySelector("#current-time");

formatTime();

// Feature 2: Change City Name to Search Bar Input
function formatCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city");
  let searchBarInput = document.querySelector("#search-bar-input");
  currentCity.innerHTML = `${searchBarInput.value}`;
  searchEngine();
}
let currentCity = document.querySelector("#current-city");
let form = document.querySelector("#search-form");
let searchBarInput = document.querySelector("#search-bar-input");

form.addEventListener("submit", formatCity);

// Feature 3 - Bonus: Celcius to Farenheight Conversion - Fake Data
function convertFarenheight(event) {
  event.preventDefault();
  let currentWeather = document.querySelector("#current-weather");
}

function convertCelcius(event) {
  event.preventDefault();
  let currentWeather = document.querySelector("#current-weather");
}
let currentWeather = document.querySelector("#currentWeather");
let celciusTemperature = document.querySelector("#celcius-temperature");
celciusTemperature.addEventListener("click", convertCelcius);
let fahrenheitTemperature = document.querySelector("#farenheit-temperature");
fahrenheitTemperature.addEventListener("click", convertFarenheight);

// Search Engine
function searchEngine() {
  let apiKey = "04bde8cc7f569f7c5603cdbc6deb89a3";
  let units = "metric";
  let city = document.querySelector("#search-bar-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(repsonce) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = repsonce.data.name;

  let temperature = Math.round(repsonce.data.main.temp);
  let currentWeather = document.querySelector("#current-weather");
  currentWeather.innerHTML = `${temperature}`;

  let humidity = Math.round(repsonce.data.main.humidity);
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;

  let currentWindSpeed = document.querySelector("#wind-speed");
  let windSpeed = Math.round(repsonce.data.wind.speed);
  currentWindSpeed.innerHTML = `Windspeed: ${windSpeed}mph`;

  let currentConditions = document.querySelector("#conditions");
  let conditions = repsonce.data.weather[0].main;
  currentConditions.innerHTML = `${conditions}`;
}

//Current Location Button
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "04bde8cc7f569f7c5603cdbc6deb89a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentLocation);
