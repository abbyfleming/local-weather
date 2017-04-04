"use strict";

module.exports = function(kelvin) {
	console.log(kelvin); 
	return (((kelvin - 273.15) * 9/5) + 32).toFixed(0);
};
