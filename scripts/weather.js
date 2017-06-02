"use strict";

var config = require("./config");


// Single day weather
function oneDayWeather(zip) {
	var key = config.weather;
	console.log("key-->", key); 

	return new Promise(function(resolve, reject){
		$.ajax({
			url: `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${key}`
		}).done(function(weatherData){
			console.log("weatherData-->", weatherData);
			resolve(weatherData); 
		});
	});
}

module.exports = {oneDayWeather}; 
