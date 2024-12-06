"use strict"

$(document).ready(function() {
	const wrapper=$("#wrapper")
	for(let i=0; i<36; i++){
	    $("<div>").addClass("box").appendTo(wrapper);
		// const div=$("<div>").addClass("box") IDENTICO
		// wrapper.append(div);
		
    }
	setInterval(aggiorna,10)
	aggiorna()
	function aggiorna(){
		let rnd=generaNumero(0,36);
		const divs=$("div.box")
		// const divs=$("div"); prende anche il div del wrapper
		// const divs=$("#wrapper div") Va bene
		// const divs=wrapper.children("div"); Va bene, prende figli diretti
		// const divs=wrapper.find("div"); prende figli e nipoti
		const div=divs.eq(rnd)
		div.animate({opacity:0.3},400)
			.animate({opacity:0.6},400)
		.animate({opacity:1},400)


	

	function generaNumero(min, max){
		return Math.floor((max-min)*Math.random()) + min;	
	}

}
});