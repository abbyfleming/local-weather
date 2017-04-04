"use strict";
let Handlebars = require('hbsfy/runtime');


let weather = require("./weather");
let	oneDayWeatherTemplate = require('../templates/one-day-weather.hbs');

/* REGISTER THE HELPER */
var convertTemp = require('./helpers/convertTemp');
Handlebars.registerHelper('convertTemp', convertTemp);



function runWeather(){
	var zipCode = document.getElementById("zipInput").value;
	var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);

	if (isValidZip){
		weather.oneDayWeather(zipCode)
		.then((data) =>{
			//output data to HTML
			createHTML(data);
		});

	} else {
		// console.log("zip not valid"); 
		// window.alert("Woah there, we need a valid zip code.");
		
	}
}

function createHTML(weatherData) {
	// Target where the results will be displayed
	// Send the data to the Handlebars template
	
	let displayWeather = document.getElementById("weather-output");
	displayWeather.innerHTML = oneDayWeatherTemplate(weatherData);
}


// EVENT LISTENERS
$('#submitButton').click(function() {
	runWeather();
}); 

module.exports = {runWeather, createHTML};