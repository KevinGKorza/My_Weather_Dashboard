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
	cityHist.push(city);

	localStorage.setItem('city', JSON.stringify(cityHistory));
	fiveForecastEl.empty();
	getHistory();
	getWeatherToday();
});

