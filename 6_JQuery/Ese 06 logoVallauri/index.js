"use strict"

$(document).ready(function() {

	for(let i=0; i<36; i++){
	    $("<div>").addClass("box").appendTo("#wrapper");
    }

	
	function generaNumero(min, max){
		return Math.floor((max-min)*Math.random()) + min;	
	}
	
});