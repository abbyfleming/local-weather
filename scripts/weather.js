"use strict";

var config = require("./config");


// Single day weather
function oneDayWeather(zip) {
	var key = config.weather;

	return new Promise(function(resolve, reject){
		$.ajax({
			url: `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${key}`
		}).done(function(weatherData){
			resolve(weatherData); 
		});
	});
}

// Five day forecast
function fiveDayWeather(zip) {
	var key = config.weather;

	return new Promise(function(resolve, reject){
		$.ajax({
			url:`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zip}&cnt=5&APPID=${key}`
		}).done(function(weatherData){
			resolve(weatherData.list);
		});
	});
}

module.exports = {oneDayWeather, fiveDayWeather}; 
