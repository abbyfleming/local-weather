"use strict";

// Single day weather
function oneDayWeather(zip) {
	return new Promise(function(resolve, reject){
		$.ajax({
			url: `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=APIKEYHERE`
		}).done(function(weatherData){
			resolve(weatherData); 
		});
	});
}

module.exports = {oneDayWeather}; 
