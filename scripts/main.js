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

	if (isValidZip){
		weather.oneDayWeather(zipCode)
		.then((data) =>{
			//output data to HTML
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