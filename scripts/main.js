"use strict";

/* -----BROWSERIFY ------*/
//require() returns the exports of the module name that you specify.
var Handlebars = require('hbsfy/runtime');
var weather = require("./weather");
var	oneDayWeatherTemplate = require('../templates/one-day-weather.hbs');

/*----- HANDLEBARS HELPER -----*/
var convertTemp = require('./helpers/convertTemp'); //Require for Browserify
Handlebars.registerHelper('convertTemp', convertTemp); //Register Helper

// http://solutionoptimist.com/2013/12/27/javascript-promise-chains-2/


function runWeather(){
	var zipCode = $("#zipInput").val();
	var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);

	let data = {};
	let weatherData = [];

	if (isValidZip) {
		
		weather.oneDayWeather(zipCode)
			.then((forecast) => {

				data.city = forecast.name;
				data.description = forecast.weather[0].main;
				data.temp = forecast.main.temp;

				return weather.fiveDayWeather(zipCode);
			})
			.then((forecast) => {
				
				forecast.forEach(function(item) {

					let daily = {
						day: item.temp.day,
						night: item.temp.night,
						description: item.weather[0].main
					};

					weatherData.push(daily);
				
				});

				data.extended = weatherData;
				createHTML(data);

			});

	} else {
		window.alert("Woah there, we need a valid zip code.");
	}
}



function createHTML(weatherData) {
	// Target where the results will be displayed 
	// and send the data to the Handlebars template
	$('#weather-output').html(oneDayWeatherTemplate(weatherData));
}


/* ----- EVENT LISTENERS ----- */
$('#submitButton').click(function() {
	runWeather();
}); 


module.exports = {runWeather, createHTML};