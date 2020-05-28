const city = document.getElementById('city');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const desc = document.getElementById('desc');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

const key = '7b917939960ee80b1c4416c5e0426a58';
function getCurrentWeather(lat, lon){
    const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl + api)
    .then(res => res.json())
    .then(data => renderWeatherData(data)) 
    .catch(error => error)
}

function success(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getCurrentWeather(lat, lon);
    renderDate()
}

function error(){
    window.alert('Something went wrong')
    console.log(':(((')
}

(function getUserLocation(){
    if(!navigator.geolocation){
        window.alert('Geolocation is not supported by your browser')
    }
    else{
        navigator.geolocation.getCurrentPosition(success, error);
    }
     
})()


function renderWeatherData(object){
    console.dir(object)
    city.innerText = object.name + ', ' + object.sys.country;
    temp.innerText = Math.floor(object.main.temp - 273) + '°C';
    desc.innerText = object.weather[0].main;
    feelsLike.innerText = 'Feels like: ' + (Math.floor(object.main.feels_like) - 273) + '°C';
    humidity.innerText = 'Humidity: ' + object.main.humidity + '%';
    wind.innerText = 'Wind: ' + object.wind.speed + 'm/s';
    setIcons(object.weather[0].icon)
}

function renderDate(){
    const currentDate = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    date.innerText = dayNames[currentDate.getDay()] + ' ' + (currentDate.getDay() + 1) + ' ' + monthNames[currentDate.getMonth()];
};
function setIcons(desc){
    iconArray = ['01d', '01n', '02d', '02n', '03d', '03n', '04d', '04n', '09d', '09n', '10d', '10n', '11d', '11n', '13d', '13n', '50d', '50n'];
    for (icon of iconArray){
        if (icon === desc){
            document.getElementById('icon').src = './icons/' + icon + '.png';
        }
    }
}




