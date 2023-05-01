//Challenge 1 - Date and time
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

  let h4 = document.querySelector("h4");
  h4.innerHTML = `${weekDay} ${hour}:${minute}`;
}

formatDate();

//Search and Current Weather with API

let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";

let searchCity = document.querySelector("#city-search");
searchCity.addEventListener("click", cityUpdate);

function cityUpdate(event) {
  let cityInput = document.querySelector("#city-input");
  let cityName = cityInput.value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showTemperature(response) {
  console.log(response);

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#temperature");
  cityTemp.innerHTML = temperature;
}
//currentCity works on Visual Studio Code, but not on codesandbox for some reason...
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
