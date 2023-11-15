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

  getForecast(response.data.city);
}

function dateGetter(date) {
  let min = date.getMinutes();
  let hr = date.getHours();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Friday", "Saturday"];
  let day = days[date.getDay()];

  if (min < 10) {
    min = `0${min}`;
  }
  return `${day} ${hr}:${min}`;
}

function fetchCityApi(city) {
  let apiKey = "da0374bt080af181f43co47957d8c63f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}
function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forcastSelector = document.querySelector("#weather-forecast");
  let forecastHtml = ""; 


response.data.daily.forEach(function (day, index) {
    if (index < 6){
    forecastHtml += `
   <div class="col-lg-2 forcast">
     <div class="day">
     ${formatDay(day.time)}
     </div>
     <div >
         <img src="${day.condition.icon_url}" alt="" class="forcast-img">
     </div>
     <div>
         <span class="weather-temp-max">${Math.round(day.temperature.maximum)}°</span>
         <span class="weather-temp-min">${Math.round(day.temperature.minimum)}°</span>
     </div>
   </div>`;
    }
  });

  forcastSelector.innerHTML = forecastHtml;
}

function getForecast(city){
  apiKey = "da0374bt080af181f43co47957d8c63f";
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);


}

function adjustCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-city");

  fetchCityApi(searchInput.value);
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", adjustCity);

fetchCityApi("Addis Ababa");

