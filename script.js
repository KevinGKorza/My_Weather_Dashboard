var currentDate = moment().format('dddd, MMMM Do YYYY');
$("#search").click(function() {
console.log("clicked")
var userSearchInput =$("#usersearchinput").val()
console.log(userSearchInput)
$("#usersearchhistory").append('<button type="button">' + userSearchInput + '</button>');
function getApi() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + userSearchInput + '&appid=30bfc0639100aaca12ace8ac4db0ea98&units=imperial';

    fetch(requestUrl)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        var yourCurrentWeather = data;
        $(".currentImg").css("backgroundimg", "url((http://openweathermap.org/img/wn/" + yourCurrentWeather[0].icon + "@2x.png)");
        $("#userCityName").html(yourCurrentWeather.name + " " + currentDate)
        $(".currentTemperature").append(yourCurrentWeather.main.temp)
        $("currentWindmph").append(yourCurrentWeather.wind.speed)
        $("currentHummidityIndex").append(yourCurrentWeather.main.humidity)
        console.log(yourCurrentWeather)
        ////   console.log(currentWeather.name); //city name
      //   console.log(currentDate)// current date
      //   console.log(currentWeather.weather[0].main)// weather icon
      // console.log(currentWeather.main.temp)//Temp
      //   console.log(currentWeather.main.humidity)//Temp
      //   console.log(currentWeather.main.humidity)//Temp
      console.log(yourCurrentWeather.coord)
      var coordLon = currentWeather.coord.lon;
      var coordLat = currentWeather.coord.lat;
      var weatherRequestURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coordLat + "&lon=" + coordLon +"&exclude=minutely,hourly&appid=30bfc0639100aaca12ace8ac4db0ea98&units=imperial";
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



          })


    })
}

}
