"use strict";

/* Handlebar helper to convert kelvin temperature into fahrenheit */

module.exports = function(kelvin) {
	return (((kelvin - 273.15) * 9/5) + 32).toFixed(0);
};
