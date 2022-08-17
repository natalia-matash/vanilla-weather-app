function displayTemperature(response) {
   let cityElement = document.querySelector("#city");
   cityElement.innerHTML = response.data.name;
   let descriptionElement = document.querySelector("#description");
   descriptionElement.innerHTML = response.data.weather[0].description;
   let temperatureElement = document.querySelector("#temperature");
   temperatureElement.innerHTML = Math.round(response.data.main.temp);
   let humidityElement = document.querySelector("#humidity");
   humidityElement.innerHTML = response.data.main.humidity;
   let windElement = document.querySelector("#wind");
   windElement.innerHTML = response.data.wind.speed;
   }

let apiKey = "0511a6e92a8692a228d7c70698a18f5d";
let city = "Kyiv";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(displayTemperature);
