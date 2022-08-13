var currentDate = moment().format('dddd, MMMM Do YYYY');
$("#search").click(function() {
console.log("clicked")
var userSearchInput =$("#usersearchinput").val()
console.log(userSearchInput)
$("#usersearchhistory").append('<button type="button">' + userSearchInput + '</button>');
function getApi() {
var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + userSearchInput + '&appid=a5049ba0777ebdbba26cfbab81a6559b&units=imperial';

fetch(requestUrl)
.then(function (response){
return response.json();
})
.then(function (data){
var yourCurrentWeather = data;
$(".currentImg").css("backgroundimg", "url(https://api.openweathermap.org/data/2.5/weather?q=" + yourCurrentWeather.weather[0].icon + "@2x.png)");
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
$(".currentUV span").css("background-color", "green");
} else if ( currentUV < 6) {
$(".currentUV span").css("background-color", "yellow");
} else {
$(".currentUV span").css("background-color", "orange");
}
        
//Day 1 
//http://openweathermap.org/img/wn/10d@2x.png

$(".imgA").css("backgroundimg", "url(http://openweathermap.org/img/wn/10d" + weatherData.daily[0].weather[0].icon + "@2x.png");
$(".TemperatureA").append(weatherData.daily[0].temp.day)
$(".WindA").append(weatherData.daily[0].wind_speed)
$(".HumidityA").append(weatherData.daily[0].humidity)
$(".UVA").append(weatherData.daily[0].uvi)

//Day 2 
$(".imgB").css("backgroundimg", "url(http://openweathermap.org/img/wn/10d" + weatherData.daily[0].weather[0].icon + "@2x.png");
$(".TemperatureB").append(weatherData.daily[1].temp.day)
$(".WindB").append(weatherData.daily[1].wind_speed)
$(".HumidityB").append(weatherData.daily[1].humidity)
$(".UVB").append(weatherData.daily[1].uvi)


//Day3
$(".imgC").css("backgroundimg", "url(http://openweathermap.org/img/wn/10d" + weatherData.daily[0].weather[0].icon + "@2x.png");
$(".TemperatureC").append(weatherData.daily[2].temp.day)
$(".WindC").append(weatherData.daily[2].wind_speed)
$(".HumidityC").append(weatherData.daily[2].humidity)
$(".UVC").append(weatherData.daily[2].uvi)

//Day4
$(".imgD").css("backgroundimg", "url(http://openweathermap.org/img/wn/10d" + weatherData.daily[0].weather[0].icon + "@2x.png");
$(".TemperatureD").append(weatherData.daily[3].temp.day)
$(".WindD").append(weatherData.daily[3].wind_speed)
$(".HumidityD").append(weatherData.daily[3].humidity)
$(".UVD").append(weatherData.daily[3].uvi)

//Day5
$(".imgE").css("backgroundimg", "url(http://openweathermap.org/img/wn/10d" + weatherData.daily[0].weather[0].icon + "@2x.png");
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
