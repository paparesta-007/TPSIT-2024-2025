"use strict";

const RIGHE = 5;
const COLONNE = 14;
const x0 = 32;
const y0 = 11;

var vet = [];

$(document).ready(function () {
  let tappeto = $("#mainFrame>div");
  let imgRoulette = $("#mainFrame>img");
  let numRoulette = $("#mainFrame>span");
  let punti = $("#leftFrame p");
  let btnAvvia=$("#leftFrame button")
  let nFiche = 36;
  let PuntateFatte=0;
  creaDiv();

  function creaDiv() {
    let i = 0;
    for (const cella of json) {
      let col = i % COLONNE;
      let row = Math.floor(i / COLONNE);
      let div = $("<div>", {
        class: "casella",
        css: {
          width: "53px",
          height: "53px",
          position: "absolute",
          top: `${y0 + row * 53}px`,
          left: `${x0 + col * 53}px`,
        },
        attr: {
          "data-id": cella.id,
          "data-numbers": cella.numbers,
          "data-win": cella.win,
          "data-value": cella.value,
        },
        on: {
          click: function () {
            if ($(this).children().length != 0) {
              alert("Cella già puntata");
              return;
            } else {
				if (nFiche != 0) {
					nFiche--;
					punti.text(nFiche);
					let fiche = $("<div>", {
					class: "fiche",
					});
					$(this).append(fiche);
				}
				else if(nFiche==0){
					$(".casella").off("click")
					alert("Hai esaurito le fiche");
				}
            }
          },
        },
      });

      // Aggiungi un gestore di eventi click
      div.appendTo(tappeto);
      i++;
    }
  }

  btnAvvia.on("click", function(){
    imgRoulette.attr("src","./img/rouletteMov.gif"); 

    setTimeout(function() {
		let cellaColore=""
        imgRoulette.attr("src","./img/roulette.gif"); 
		let nRandom=RandomNumber(0,36);
		// console.log(nRandom);
		for (const cella of json) {
            if (cella.value == nRandom) {
                cellaColore = cella.color;
				console.log(cellaColore);  
                break;
            }
        }
		let currentCell=$(numRoulette[PuntateFatte])
		.css({
			"backgroundColor":cellaColore,
			"color": "white",
			
		}).text(nRandom)
		PuntateFatte++;
    }, 3000);
	
});

});
 function RandomNumber(min, max) {
  
  return Math.floor(Math.random() * (max - min + 1)) + min;
}






