"use strict";

/* -----BROWSERIFY ------*/
//require() returns the exports of the module name that you specify.
var Handlebars = require('hbsfy/runtime');
var weather = require("./weather");
var	oneDayWeatherTemplate = require('../templates/one-day-weather.hbs');

/*----- HANDLEBARS HELPER -----*/
var convertTemp = require('./helpers/convertTemp'); //Require for Browserify
Handlebars.registerHelper('convertTemp', convertTemp); //Register Helper


// function runWeather(){
// 	var zipCode = $("#zipInput").val();
// 	var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);

// 	if (isValidZip){
// 		weather.oneDayWeather(zipCode)
// 		.then((data) =>{
// 			//output data to HTML
// 			createHTML(data);
// 		});

// 	} else {
// 		window.alert("Woah there, we need a valid zip code.");
// 	}
// }


/* SAMPLE DATA */
function runWeather(){

	let data = {
			"coord":{"lon":139,"lat":35},
			"sys":{"country":"JP","sunrise":1369769524,"sunset":1369821049},
			"weather":[{"id":804,"main":"clouds","description":"overcast clouds","icon":"04n"}],
			"main":{"temp":289.5,"humidity":89,"pressure":1013,"temp_min":287.04,"temp_max":292.04},
			"wind":{"speed":7.31,"deg":187.002},
			"rain":{"3h":0},
			"clouds":{"all":92},
			"dt":1369824698,
			"id":1851632,
			"name":"Shuzenji",
			"cod":200
		};

		createHTML(data);
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