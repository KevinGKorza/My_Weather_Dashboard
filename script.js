var currentDate = moment().format('dddd, MMMM Do YYYY');
$("#search").click(function() {
console.log("clicked")
var userSearchInput =$("#usersearchinput").val()
console.log(userSearchInput)
$("#usersearchhistory").append('<button type="button">' + userSearchInput + '</button>');
function getApi() {
    //https://api.openweathermap.org/data/2.5/weather?      '&appid={a5049ba0777ebdbba26cfbab81a6559b}' 
    
      
var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + userSearchInput + '&appid=a5049ba0777ebdbba26cfbab81a6559b&units=imperial';

fetch(requestUrl)
.then(function (response){
return response.json();
})
.then(function (data){
var yourCurrentWeather = data;
$(".currentImg").css("backgroundimage", "url(https://api.openweathermap.org/data/2.5/weather?q=" + yourCurrentWeather.weather[0].icon + "@2x.png)");
$("#userCityName").html(yourCurrentWeather.name + " " + currentDate)
$(".currentTemperature").append(yourCurrentWeather.main.temp)
$("currentWindmph").append(yourCurrentWeather.wind.speed)
$("currentHummidityIndex").append(yourCurrentWeather.main.humidity)
console.log(yourCurrentWeather)
console.log(yourCurrentWeather.coord)
var coordLon = yourCurrentWeather.coord.lon;
var coordLat = yourCurrentWeather.coord.lat;
var weatherRequestURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coordLat + "&lon=" + coordLon +"&exclude=minutely,hourly&appid=a5049ba0777ebdbba26cfbab81a6559b&units=imperial";
console.log(weatherRequestURL)

fetch(weatherRequestURL)
.then(function (weatherResponse){
return weatherResponse.json();
})
.then(function (weatherData) {
var currentUV = weatherData.current.uvi;
$(".currentUV span").append(weatherData.current.uvi)
if(currentUV < 2) {
$(".currentUV span").css("backgroundcolor", "green");
} else if ( currentUV < 6) {
$(".currentUV span").css("backgroundcolor", "yellow");
} else {
$(".currentUV span").css("backgroundcolor", "orange");
}
        

//http://openweathermap.org/img/wn/10d@2x.png
//Make it so the api will give the current temperature, wind, humidity, and uva index to travelers
//Trying to make it so an appropriate image loads as well (ie: if it's cloudy then clouds will generate, if it's sunny then the sun will generate)
//https://openweathermap.org/weather-conditions

$(".imgA").css("backgroundimage", "url(http://openweathermap.org/img/wn/" + weatherData.daily[0].weather[0].icon + "@2x.png");
$(".TemperatureA").append(weatherData.daily[0].temp.day)
$(".WindA").append(weatherData.daily[0].wind_speed)
$(".HumidityA").append(weatherData.daily[0].humidity)
$(".UVA").append(weatherData.daily[0].uvi)

$(".imgB").css("backgroundimage", "url(http://openweathermap.org/img/wn/10d" + weatherData.daily[0].weather[0].icon + "@2x.png");
$(".TemperatureB").append(weatherData.daily[1].temp.day)
$(".WindB").append(weatherData.daily[1].wind_speed)
$(".HumidityB").append(weatherData.daily[1].humidity)
$(".UVB").append(weatherData.daily[1].uvi)

$(".imgC").css("backgroundimage", "url(http://openweathermap.org/img/wn/10d" + weatherData.daily[0].weather[0].icon + "@2x.png");
$(".TemperatureC").append(weatherData.daily[2].temp.day)
$(".WindC").append(weatherData.daily[2].wind_speed)
$(".HumidityC").append(weatherData.daily[2].humidity)
$(".UVC").append(weatherData.daily[2].uvi)

$(".imgD").css("backgroundimage", "url(http://openweathermap.org/img/wn/10d" + weatherData.daily[0].weather[0].icon + "@2x.png");
$(".TemperatureD").append(weatherData.daily[3].temp.day)
$(".WindD").append(weatherData.daily[3].wind_speed)
$(".HumidityD").append(weatherData.daily[3].humidity)
$(".UVD").append(weatherData.daily[3].uvi)

$(".imgE").css("backgroundimage", "url(http://openweathermap.org/img/wn/10d" + weatherData.daily[0].weather[0].icon + "@2x.png");
$(".TemperatureE").append(weatherData.daily[4].temp.day)
$(".WindE").append(weatherData.daily[4].wind_speed)
$(".HumidityE").append(weatherData.daily[4].humidity)
$(".UVE").append(weatherData.daily[4].uvi)



console.log(weatherData);
console.log(weatherData.current.uvi);
console.log(weatherData.daily[0].weather[0].icon)
console.log(weatherData.daily[0].temp.day)
console.log(weatherData.daily[0].wind_speed)
console.log(weatherData.daily[0].humidity)



});


});
}
getApi();

});
