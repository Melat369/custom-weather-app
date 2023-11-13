function refreshWeather(response) {
  let city = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let days = document.querySelector("#days");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity-percentage");
  let wind = document.querySelector("#speed");
  let date = new Date(response.data.time * 1000);
  let currentIcon = document.querySelector("#icon");

  city.innerHTML = response.data.city;
  days.innerHTML = dateGetter(date);
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}km/hr`;
  temperatureElement.innerHTML = Math.round(temperature);
  currentIcon.innerHTML = `<img src = "${response.data.condition.icon_url}" class = "weather-app-icon" />`;
}

function dateGetter(date) {
  let min = date.getMinutes();
  let hr = date.getHours();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Friday", "Saturday"];
  let day = days[date.getDay()];

  if (min<10){
    min = `0${min}`;
  }
  return `${day} ${hr}:${min}`;
}

function fetchCityApi(city) {
  let apiKey = "da0374bt080af181f43co47957d8c63f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function adjustCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#input-city");
  fetchCityApi(searchedCity.value);
}

let searchCity = document.querySelector("#input-city");
searchCity.addEventListener("submit", adjustCity);

fetchCityApi("Addis Ababa");