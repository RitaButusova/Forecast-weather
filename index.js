// 1. navigation

// 2. HTTP request

// 3. display

function getWeather() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      receiveData(position.coords.latitude.toFixed(2), position.coords.longitude.toFixed(2));
    })
  } else {
    alert('Could not get location.');
  }
}

function receiveData(lat, long) {
  fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon='+ long +'&appid=b39bc41d2ebb7cdb7c7432343a8a764a' + '&lang=ua')
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      displayWeather(response);
    })
    
}

function displayWeather(arr_weather) {
  document.querySelector('.local-city').innerHTML = arr_weather.name;
  document.getElementById('current-humidity').innerHTML = 'Humidity : ' + arr_weather.main.humidity + '%';
  document.getElementById('current-pressure').innerHTML = 'Pressure : ' + arr_weather.main.pressure + ' mm';
  var temp = +arr_weather.main.temp - 273.15;
  document.getElementById('current-temperature').innerHTML = 'Temperature : ' + temp.toFixed(0) + '°C';
  document.getElementById('current-wind-speed').innerHTML = 'Wind speed : ' + arr_weather.wind.speed + ' m/s';
  document.getElementById('current-description').innerHTML = arr_weather.weather[0].description;
}

var inputCity = document.getElementById('city_input');
var find_button = document.getElementById('find_buton');

find_button.disabled = true;

  function setButtonStatus() {
  find_button.disabled = !this.value;
}


function receiveDataByCityName() {  
  var name = inputCity.value;
  console.log(name);
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + name +'&appid=b39bc41d2ebb7cdb7c7432343a8a764a')
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      displayWeatherByCityName(response);
    })
    
}




function displayWeatherByCityName(arr_weather) {
  document.querySelector('.name-city').innerHTML = arr_weather.name;
  document.getElementById('humidity-city').innerHTML = 'Humidity : ' + arr_weather.main.humidity + '%';
  document.getElementById('pressure-city').innerHTML = 'Pressure : ' + arr_weather.main.pressure + ' mm';
  var temp = +arr_weather.main.temp - 273.15;
  document.getElementById('temperature-city').innerHTML = 'Temperature : ' + temp.toFixed(0) + '°C';
  document.getElementById('wind-speed-city').innerHTML = 'Wind speed : ' + arr_weather.wind.speed + ' m/s';
  document.getElementById('description-city').innerHTML = arr_weather.weather[0].description;
}

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

recognition.interimResults = true;

recognition.lang = 'en-US';

recognition.addEventListener('result', function (event) {
  inputCity.value = Array
    .from(event.results)
    .map(function (results) {
      return results[0];
    })
    .map(function (results) {
      return results.transcript;
    })
    .join('');
    if(inputCity.value.length){
      find_button.disabled = false;
    }
    recognition.stop();
  });
recognition.start();

inputCity.addEventListener('input', setButtonStatus);
find_button.addEventListener('click', receiveDataByCityName);