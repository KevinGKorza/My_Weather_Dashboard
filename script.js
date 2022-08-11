var city = "Hartford";
var key = 'a5049ba0777ebdbba26cfbab81a6559b';
var currentDate = moment().format('dddd, MMMM Do YYYY');
var currentTime = moment().format('YYYY-MM-DD HH:MM:SS');
var cityHistory = [];

$('.search').on("click", function (event) {
	event.preventDefault();
	city = $(this).parent('.btnParameter').siblings('.textValue').val().trim();
	if (city === "") {
		return;
	};
	cityHistory.push(city);

	localStorage.setItem('city', JSON.stringify(cityHistory));
	fiveForecastEl.empty();
	getHistory();
	getWeatherToday();
});

//buttons based on the users search history
var continuedHistoryEl = $('.cityHistory');
function getHistory() {
continuedHistoryEl.empty();

for (let i = 0; i < cityHistory.length; i++) {
var rowEl = $('<row>');
var buttonEl = $('<button>').text(`${cityHist[i]}`)

rowEl.addClass('row historyButtonRow');
buttonEl.addClass('button buttonoutlinesecondary historyButton');
buttonEl.attr('type', 'button');

continuedHistoryEl.prepend(rowEl);
rowEl.append(buttonEl);
} if (!city) {
    return;
}

//allows the buttons to start a search as well
$('.historyButton').on("click", function (event) {
event.preventDefault();
city = $(this).text();
fiveDayForecastEl.empty();
getWeatherToday();
});
};

//Grab the main "today" card body
var cardBodyToday = $('.cardBodyToday')

//Applies the weather data to the today card and then launches the five day forcast
function getWeatherToday() {
var getCurrentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;

$(cardBodyToday).empty();

$.ajax({
    url: getCurrentUrl,
    method: 'GET',
}).then(function (response) {
$('.cardCityName').text(response.name);
$('.cardToday').text(date);

//Icons
$('.icons').attr('src', `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);

//Temperature 
var pElTemp = $('<p>').text(`Temperature: ${response.main.temp} °F`);
cardBodyToday.append(pElTemp);

//Feels like
var pElFeelsLike = $('<p>').text(`Feels Like: ${response.main.feelslike} °F`);
cardBodyToday.append(pElFeelsLike);

//Humidity
var pElHumidity = $('<p>').text(`Humidity: ${response.main.humidity} %`);
cardBodyToday.append(pElHumidity);

//Wind Speed
var pElWindSpeed = $('<p>').text(`Wind Speed: ${response.windspeed} MPH`);
cardBodyToday.append(pElWindSpeed);

//Set the lat and long from the searched city
var cityLongitude = response.coord.longitide;

// console.log(cityLon);
var cityLatitude = response.coord.latitude;
// console.log(cityLat);

var getUVI = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLatitude}&lon=${cityLongitude}&exclude=hourly,daily,minutely&appid=${key}`;
$.ajax({
    url: getUVI,
    method: 'GET',
}).then(function (response) {
var pElUvi = $('<p>').text(`UV Index: `);
var uviSpan = $('<span>').text(response.current.uvi);
var uvi = response.current.uvi;
pElUvi.append(uviSpan);
cardTodayBody.append(pElUvi);
//set the UV index to match an exposure chart severity based on color
if (uvi >= 0 && uvi <= 2) {
    uviSpan.attr('class', 'green');
} else if (uvi > 2 && uvi <= 5) {
    uviSpan.attr("class", "yellow")
} else if (uvi > 5 && uvi <= 7) {
    uviSpan.attr("class", "orange")
} else if (uvi > 7 && uvi <= 10) {
    uviSpan.attr("class", "red")
} else {
    uviSpan.attr("class", "purple")
}
});
});
getFiveDayForecast();
};
