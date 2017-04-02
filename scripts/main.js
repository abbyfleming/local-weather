"use strict";

let weather = require("./weather"),
		user = require("./user"),
		oneDayWeatherTemplate = require('../templates/one-day-weather.hbs');


function runWeather(){
	var zipCode = document.getElementById("zipInput").value;
	var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);

	if (isValidZip){
		weather.oneDayWeather(zipCode)
		.then((data) =>{
			createHTML(data);
		});

	} else {
		// console.log("zip not valid"); 
		// window.alert("Woah there, we need a valid zip code.");
	}
}

function createHTML(weatherData) {
	console.log("weatherData-->", weatherData); 
	let displayWeather = document.getElementById("weather-output");
	displayWeather.innerHTML = oneDayWeatherTemplate(weatherData);
}


// EVENT LISTENERS

$('#submitButton').click(function() {
	runWeather();
}); 


module.exports = {runWeather, createHTML};