function formatDate(timestamp) {
   let date = new Date();//timestamp - lasr updated
   let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
   let day = days[date.getDay()];
   let hours = date.getHours();
   if (hours < 10) {
      hours =`0${hours}`};
   let minutes = date.getMinutes();
   if (minutes < 10) {
      minutes =`0${minutes}`};
   return `${day} ${hours}:${minutes}`;

}

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
   let dateElement = document.querySelector("#date");
   dateElement.innerHTML = formatDate(response.data.dt * 1000);
   let iconElement = document.querySelector("#icon");
   iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   iconElement.setAttribute("alt", response.data.weather[0].icon);
   }

let apiKey = "0511a6e92a8692a228d7c70698a18f5d";
let city = "Kyiv";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(displayTemperature);
