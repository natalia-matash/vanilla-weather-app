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

function formatDay(timestamp) {
   let date = new Date(timestamp * 1000);
   let days = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat",];
   let day = date.getDay();
   return days[day];

}

function displayForecast(response) {
   let forecastElement = document.querySelector("#forecast");
   let forecast = response.data.daily;
   let forecastHTML = `<div class="row">`;
   
   forecast.forEach(function(forecastDay, index) {
      if(index < 5) {
      forecastHTML = forecastHTML + 
   `<div class="col">
      <div class="future__day">${formatDay(forecastDay.dt)}</div>
      <img class="icons" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="">
      <div class="future__temperature">
        <span class="temperature__max">${Math.round(forecastDay.temp.max)}&deg;</span>
        <span class="tempetarure__min">${Math.round(forecastDay.temp.min)}&deg;</span>
      </div>
    </div>`;
      }
   })

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
   let apiKey = "0511a6e92a8692a228d7c70698a18f5d";
   let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
   let cityElement = document.querySelector("#city");
   cityElement.innerHTML = response.data.name;

   let descriptionElement = document.querySelector("#description");
   descriptionElement.innerHTML = response.data.weather[0].description;

   let temperatureElement = document.querySelector("#temperature");
   celsiusTemperature = response.data.main.temp;
   temperatureElement.innerHTML = Math.round(celsiusTemperature);

   let humidityElement = document.querySelector("#humidity");
   humidityElement.innerHTML = response.data.main.humidity;

   let windElement = document.querySelector("#wind");
   windElement.innerHTML = response.data.wind.speed;

   let dateElement = document.querySelector("#date");
   dateElement.innerHTML = formatDate(response.data.dt * 1000);

   let iconElement = document.querySelector("#icon");
   iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   iconElement.setAttribute("alt", response.data.weather[0].icon);
   
   getForecast(response.data.coord);
}


function search(city) {
let apiKey = "0511a6e92a8692a228d7c70698a18f5d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

}

function handleSubmit(event) {
   event.preventDefault();
   let cityInputElement = document.querySelector("#input")
   search(cityInputElement.value); 
}


// function displayFahrenheitTemperature(event) {
//    event.preventDefault();
//    let temperatureElement = document.querySelector("#temperature");
//    celsiusLink.classList.remove("active");
//    fahrenheitLink.classList.add("active");
//    celsiusLink.classList.add("no-active");
//    fahrenheitLink.classList.remove("no-active");
//    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
//    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
// }

// function displayCelsiusTemperature(event) {
//    event.preventDefault();
//    celsiusLink.classList.add("active");
//    fahrenheitLink.classList.remove("active");
//    celsiusLink.classList.remove("no-active");
//    fahrenheitLink.classList.add("no-active");
//    let temperatureElement = document.querySelector("#temperature");
//    temperatureElement.innerHTML = Math.round(celsiusTemperature);
// }


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// let celsiusTemperature = null;

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Kyiv");
displayForecast();