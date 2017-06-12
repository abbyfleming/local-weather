"use strict";

var config = require("./config");


// Single day weather
let oneDayWeather = (zip) => {
	var key = config.weather;

	return new Promise(function(resolve, reject){
		$.ajax({
			url: `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${key}`
		}).done(function(weatherData){
			// console.log("weatherData-->", weatherData); 
			resolve(weatherData); 
		});
	});
};

// Five day forecast
let fiveDayWeather = (zip) => {
	var key = config.weather;

	return new Promise(function(resolve, reject){
		$.ajax({
			url:`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zip}&cnt=5&APPID=${key}`
		}).done(function(weatherData){
			// console.log("weatherData-->", weatherData); 
			resolve(weatherData.list);
		});
	});
};

module.exports = {oneDayWeather, fiveDayWeather}; 
