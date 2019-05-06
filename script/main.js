var temp = document.getElementById('temprature');
var humidity = document.getElementById('humidity');
var wind = document.getElementById('wind');
var weather = document.getElementById('weather');
var img = document.getElementById('main-img');
var head = document.querySelector('header');
var cityName = document.getElementById('city');
var future = document.getElementById('future');
var data ;
let longitude;
let latitude;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  loadDetail();
}

getLocation();

loadDetail = () => {
  const xhr = new XMLHttpRequest();
  const loc = 'https://api.openweathermap.org/data/2.5/forecast/daily?lat=' + latitude + '&lon=' + longitude + '&cnt=7&appid='+appId;
  console.log(loc);
  xhr.open('GET', loc, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const cost = JSON.parse(this.responseText);
      temp.innerHTML += `${Math.floor(cost.list[0].temp.day-273)}<sup>°C</sup>`;
      humidity.innerHTML += `${cost.list[0].humidity}%`;
      wind.innerHTML += `${cost.list[0].speed} Km/h`;
      weather.innerHTML += `${cost.list[0].weather[0].description}`;
      cityName.innerHTML += `${cost.city.name}`;
      date = new Date(cost.list[1].dt * 1000);
      data = cost.list[0].weather[0].id;
      if (data == 800) {
        img.innerHTML += `<li><img src="img/cloudy.png" alt="check internet connection">`;
      } else if (data >= 200 && data < 300) {
        img.innerHTML += `<li><img src="img/storm.png" alt="check internet connection">`;
      } else if (data >= 300 && data < 400) {
        img.innerHTML += `<li><img src="img/drizzle.png" alt="check internet connection">`;
      } else if (data >= 500 && data < 532) {
        img.innerHTML += `<li><img src="img/rain.png" alt="check internet connection">`;
      } else if (data >= 600 && data < 622) {
        img.innerHTML += `<li><img src="img/snow.png" alt="check internet connection">`;
      } else if (data >= 700 && data < 781) {
        img.innerHTML += `<li><img src="img/nimbostratus.png" alt="check internet connection">`;
      } else if (data >= 801 && data < 805) {
        img.innerHTML += `<li><img src="img/stratuscumulus.png" alt="check internet connection">`;
      }
      console.log(data);
      for (var i = 1; i <= 6; i++) {
        img = cost.list[i].weather[0].id;
        if (img == 800) {
          future.innerHTML += `<li><img src="img/cloudy.png" alt="check internet connection"><br>${Math.floor(cost.list[i].temp.day -273)}°C</li>`;
        } else if (img >= 200 && img < 300) {
          future.innerHTML += `<li><img src="img/storm.png" alt="check internet connection"><br>${Math.floor(cost.list[i].temp.day -273)}°C</li>`;
        } else if (img >= 300 && img < 400) {
          future.innerHTML += `<li><img src="img/drizzle.png" alt="check internet connection"><br>${Math.floor(cost.list[i].temp.day -273)}°C</li>`;
        } else if (img >= 500 && img < 532) {
          future.innerHTML += `<li><img src="img/rain.png" alt="check internet connection"><br>${Math.floor(cost.list[i].temp.day -273)}°C</li>`;
        } else if (img >= 600 && img < 622) {
          future.innerHTML += `<li><img src="img/snow.png" alt="check internet connection"><br>${Math.floor(cost.list[i].temp.day -273)}°C</li>`;
        } else if (img >= 700 && img < 781) {
          future.innerHTML += `<li><img src="img/nimbostratus.png" alt="check internet connection"><br>${Math.floor(cost.list[i].temp.day -273)}°C</li>`;
        } else if (img >= 801 && img < 805) {
          future.innerHTML += `<li><img src="img/stratuscumulus.png" alt="check internet connection"><br>${Math.floor(cost.list[i].temp.day -273)}°C</li>`;
        }
      }
    }
  }
  xhr.send();
}