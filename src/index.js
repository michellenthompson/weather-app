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

//Challenge 2 - Search and city name update

let searchCity = document.querySelector("#city-search");
searchCity.addEventListener("click", cityUpdate);

function cityUpdate(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let cityResult = document.querySelector("#city");
  cityResult.innerHTML = `${city.value}`;
}

//Challenge 3 - Update temperature between C and F

let temperature = document.getElementById("temperature");
let celsiusLink = document.getElementById("celsius-link");
let fahrenheitLink = document.getElementById("fahrenheit-link");

let temp = 25;
let unit = "C";
temperature.textContent = `${temp}°C`;

celsiusLink.addEventListener("click", convertToCelsius);
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  if (unit === "F") {
    // Convert Fahrenheit to Celsius
    temp = ((temp - 32) * 5) / 9;
    unit = "C";
    temperature.textContent = `${Math.round(temp)}°C`;
  }
}

function convertToFahrenheit(event) {
  event.preventDefault();
  if (unit === "C") {
    // Convert Celsius to Fahrenheit
    temp = (temp * 9) / 5 + 32;
    unit = "F";
    temperature.textContent = `${Math.round(temp)}°F`;
  }
}
