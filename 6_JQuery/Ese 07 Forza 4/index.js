"use strict";
const RIGHE = 6;
const COLONNE = 7;
const GIALLO = "#FF0";
const ROSSO = "#F00";
let turno = GIALLO;

$(function () {
    let header = $("#header");
    let wrapper = $("#wrapper");

    creaPedine();
    creaPedineIntestazione();

    function creaPedineIntestazione() {
        for (let i = 0; i < COLONNE; i++) {
            let div = $("<div>", {
                "class": "pedina",
                "appendTo": header,
                "on": {
                    "mouseover": function () {
                        div.css({
                            backgroundColor: turno == GIALLO ? "yellow" : "red"
                        });
                    },
                    "mouseout": function () {
                        div.css({
                            backgroundColor: "#BBB"
                        });
                    },
                    "click": scendi(i) ,
                }
            });
        }
    }

    function creaPedine() {
        for (let i = 0; i < COLONNE; i++) {
            for (let j = 0; j < RIGHE; j++) {
                let div = $("<div>", {
                    "class": "pedina",
                    "appendTo": wrapper,
                    "id": i + "-" + j
                });
            }
        }
    }

	function scendi(i){
		// Change the player's turn
		turno = turno == GIALLO ? ROSSO : GIALLO;
                        
		// Set the background color of the column header to reflect the current player's turn
		
	}
});
