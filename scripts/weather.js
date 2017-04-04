"use strict";

// Single day weather
function oneDayWeather(zip) {
	return new Promise(function(resolve, reject){
		$.ajax({
			url: ``
		}).done(function(weatherData){
			console.log("weatherData-->", weatherData);
			resolve(weatherData); 
		});
	});
}

module.exports = {oneDayWeather}; 
