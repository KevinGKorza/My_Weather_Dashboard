//Makes it so the current date displays for the user when they click their destination
var currentDate = moment().format('dddd, MMMM Do YYYY');
$("#search").click(function() {
console.log("More Information Below for Your Destination")
var userSearchInput =$("#usersearchinput").val()
console.log(userSearchInput)
$("#usersearchhistory").append('<button type="button">' + userSearchInput + '</button>');
//Local Storage (shows the user their search history)
localStorage.setItem("usersearchhistory", userSearchInput);
$("usersearchhistory").append('<button type="button">' + localStorage.getItem("usersearchhistory") + '</button>');
function getApi() {
//The API url along with my generated key from openweathermap.org (api key: a5049ba0777ebdbba26cfbab81a6559b)
var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + userSearchInput + '&appid=a5049ba0777ebdbba26cfbab81a6559b&units=imperial';

//The Fetch request, makes the user see what the current weather conditions are in the selected city (current temp, current wind speed, and the current uv index, also gives them an image)
fetch(requestUrl)
.then(function (response){
return response.json();
})
.then(function (data){
var yourCurrentWeather = data;
//https://openweathermap.org/current
$(".currentImage").css("background_image", "url(https://api.openweathermap.org/data/2.5/weather?q=" + yourCurrentWeather.weather[0].icon + "@2x.png)");
$("#userCityName").html(yourCurrentWeather.name + " " + currentDate)
$(".currentTemperature").append(yourCurrentWeather.main.temp)
$(".currentWindmph").append(yourCurrentWeather.wind.speed)
$(".currentHumidityIndex").append(yourCurrentWeather.main.humidity)
console.log(yourCurrentWeather)
console.log(yourCurrentWeather.coord)
var coordLon = yourCurrentWeather.coord.lon;
var coordLat = yourCurrentWeather.coord.lat;
//https://openweathermap.org/current
var weatherRequestURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coordLat + "&lon=" + coordLon +"&exclude=minutely,hourly&appid=a5049ba0777ebdbba26cfbab81a6559b&units=imperial";
console.log(weatherRequestURL)
//Gives the user an indication on how powerful the sun is that day, green is a good level, yellow is in the middle, and red is bad level  
fetch(weatherRequestURL)
.then(function (weatherResponse){
return weatherResponse.json();
})
.then(function (weatherData) {
var currentUV = weatherData.current.uvi;
$(".currentUVIndex").append(weatherData.current.uvi)
if(currentUV < 2) {
$(".currentUVIndex").css("background_color", "green");
} else if ( currentUV < 6) {
$(".currentUVIndex").css("background_color", "yellow");
} else {
$(".currentUVIndex").css("background_color", "red");
}
        

//http://openweathermap.org/img/wn/10d@2x.png
//Make it so the api will give the current temperature, wind, humidity, and uv index to travelers
//Trying to make it so an appropriate image loads as well (ie: if it's cloudy then clouds will generate, if it's sunny then the sun will generate)
//https://openweathermap.org/weather-conditions
//Five Day Forecast

$(".img1").css("background_img", "url(http://openweathermap.org/img/wn/" + weatherData.daily[0].weather[0].icon + "10d@2x.png");
$(".TemperatureA").append(weatherData.daily[0].temp.day)
$(".WindA").append(weatherData.daily[0].wind_speed)
$(".HumidityA").append(weatherData.daily[0].humidity)
$(".UVA").append(weatherData.daily[0].uvi)

$(".imgB").css("background_img", "url(http://openweathermap.org/img/wn/" + weatherData.daily[1].weather[0].icon + "10d@2x.png");
$(".TemperatureB").append(weatherData.daily[1].temp.day)
$(".WindB").append(weatherData.daily[1].wind_speed)
$(".HumidityB").append(weatherData.daily[1].humidity)
$(".UVB").append(weatherData.daily[1].uvi)

$(".imgC").css("background_img", "url(http://openweathermap.org/img/wn/" + weatherData.daily[2].weather[0].icon + "10d@2x.png");
$(".TemperatureC").append(weatherData.daily[2].temp.day)
$(".WindC").append(weatherData.daily[2].wind_speed)
$(".HumidityC").append(weatherData.daily[2].humidity)
$(".UVC").append(weatherData.daily[2].uvi)

$(".imgD").css("background_img", "url(http://openweathermap.org/img/wn/" + weatherData.daily[3].weather[0].icon + "10d@2x.png");
$(".TemperatureD").append(weatherData.daily[3].temp.day)
$(".WindD").append(weatherData.daily[3].wind_speed)
$(".HumidityD").append(weatherData.daily[3].humidity)
$(".UVD").append(weatherData.daily[3].uvi)

$(".imgE").css("background_img", "url(http://openweathermap.org/img/wn/" + weatherData.daily[4].weather[0].icon + "10d@2x.png");
$(".TemperatureE").append(weatherData.daily[4].temp.day)
$(".WindE").append(weatherData.daily[4].wind_speed)
$(".HumidityE").append(weatherData.daily[4].humidity)
$(".UVE").append(weatherData.daily[4].uvi)


//if you open up the console, all the information for your city is there
//weather data
console.log(weatherData);
//the current UV index level
console.log(weatherData.current.uvi);
//this makes it possible for the image to generate
console.log(weatherData.daily[0].weather[0].icon)
//the current temperature for your city
console.log(weatherData.daily[0].temp.day)
//the current wind speed for your city
console.log(weatherData.daily[0].wind_speed)
//the current humidity for your city
console.log(weatherData.daily[0].humidity)

});

});
}
getApi();

});
