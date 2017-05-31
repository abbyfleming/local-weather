"use strict";

// Single day weather
function oneDayWeather(zip) {
	return new Promise(function(resolve, reject){
		$.ajax({
			url: `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=c10648665493f00d731df750ee9b0436`
		}).done(function(weatherData){
			console.log("weatherData-->", weatherData);
			resolve(weatherData); 
		});
	});
}

module.exports = {oneDayWeather}; 
