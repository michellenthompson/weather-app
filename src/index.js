//Date and time
let now = new Date();

function formatDate() {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekDay = weekDays[now.getDay()];
  let hour = now.getHours();

  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${weekDay} ${hour}:${minute}`;
}

formatDate();

//Search and Current Weather with API
let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";

let searchCity = document.querySelector("#city-search");
searchCity.addEventListener("click", cityUpdate);

//City in search and update text
function cityUpdate(event) {
  let cityInput = document.querySelector("#city-input");
  let cityName = cityInput.value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

//Temperature
function showTemperature(response) {
  console.log(response.data);

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#temperature");
  cityTemp.innerHTML = temperature;

  celsiusTemp = response.data.main.temp;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let windspeed = document.querySelector("#wind");
  windspeed.innerHTML = response.data.wind.speed;
}

//Current city
let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const coordinates = position.coords;
    let apiGeo = `http://api.openweathermap.org/geo/1.0/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&limit=1`;

    axios.get(`${apiGeo}&appid=${apiKey}`).then((response) => {
      let cityName = response.data[0].name;
      let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric`;

      axios.get(`${apiWeather}&appid=${apiKey}`).then(showTemperature);
    });
  });
});

//Temperature unit conversion C to F
let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

//Temperature unit conversion F to C
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}
