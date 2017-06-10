"use strict";

/* -----BROWSERIFY ------*/
//require() returns the exports of the module name that you specify.
var Handlebars = require('hbsfy/runtime');
var weather = require("./weather");
var	oneDayWeatherTemplate = require('../templates/one-day-weather.hbs');

/*----- HANDLEBARS HELPER -----*/
var convertTemp = require('./helpers/convertTemp'); //Require for Browserify
Handlebars.registerHelper('convertTemp', convertTemp); //Register Helper


function runWeather(){
	var zipCode = $("#zipInput").val();
	var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);


	if (isValidZip) {
		weather.oneDayWeather(zipCode)
		.then((data) => {
			// do something
			console.log("data-->", data); 
			// createHTML(data);
		});

	} else {
		window.alert("Woah there, we need a valid zip code.");
	}
}



function runFive() {

	let weatherData = [];
	
	weather.fiveDayWeather(37091)
		.then((data) => {

			// deconstruct the data being return for easy handlings
			data.forEach(function(item) {

				let daily = {
					day: item.temp.day,
					night: item.temp.night,
					description: item.weather[0].main
				};
				
				weatherData.push(daily);
			});
		
			console.log("weatherData-->", weatherData); 
			createHTML(weatherData);
		});
}



function createHTML(weatherData) {
	// Target where the results will be displayed 
	// and send the data to the Handlebars template
	$('#weather-output').html(oneDayWeatherTemplate(weatherData));
}


/* ----- EVENT LISTENERS ----- */
$('#submitButton').click(function() {
	// runWeather();
	// runFive();

}); 


module.exports = {runWeather, createHTML};