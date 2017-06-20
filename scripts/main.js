"use strict";

/* -----BROWSERIFY ------*/
//require() returns the exports of the module name that you specify.
var Handlebars = require('hbsfy/runtime');
var config = require("./config");
var	oneDayWeatherTemplate = require('../templates/one-day-weather.hbs');

/*----- HANDLEBARS HELPER -----*/
var convertTemp = require('./helpers/convertTemp'); //Require for Browserify
Handlebars.registerHelper('convertTemp', convertTemp); //Register Helper

// TODO: this should be private?
let key = config.weather;
let data = {};
let weatherData = [];


function runWeather(){
	let zipCode = $("#zipInput").val();
	let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);

	if (isValidZip) {

		A().then(B).then(C);
	
	} else {
		window.alert(`Invalid zipcode.`);
	}
}


function A(){
	let zip = $('#zipInput').val();
	
	return $.ajax({
				url: `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${key}`,
				type: 'GET',
				dataType: 'JSON'
			}).done(function(weatherData){
				// add city name, description, temperature to object
				data.city = weatherData.name;
				data.description = weatherData.weather[0].main;
				data.temp = weatherData.main.temp;				
			
			}).fail(function(error){
				window.alert(`${error.responseJSON.message}`);
			});
}


function B(){
	let zip = $('#zipInput').val();
	
	return $.ajax({
		url:`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zip}&cnt=5&APPID=${key}`,
		type: 'GET',
		dataType: 'JSON'
	}).done(function(data){

		let forecast = data.list;

		forecast.forEach(function(item) {

			let daily = {
				day: item.temp.day,
				night: item.temp.night,
				description: item.weather[0].main
			};

		weatherData.push(daily);	

		});
	}).fail(function(error){
			window.alert(`${error.responseJSON.message}`);
	});
}


function C(){
	data.extended = weatherData;
	createHTML(data);
}


function createHTML(weatherData) {
	// Target where the results will be displayed and send the data to the Handlebars template
	$('#weather-output').html(oneDayWeatherTemplate(weatherData));
}


/* ----- EVENT LISTENERS ----- */
$('#submitButton').click(function() {
 	runWeather();
}); 

module.exports = {
	// since there's no other modules, there's no need to export them
};