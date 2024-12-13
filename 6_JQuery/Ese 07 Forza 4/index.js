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

  // Create header tokens (where players click to drop tokens)
  function creaPedineIntestazione() {
    for (let i = 0; i < COLONNE; i++) {
      let div = $("<div>", {
        "class": "pedina",
        "appendTo": header,
        "on": {
          "mouseover": function () {
            div.css({
              backgroundColor: turno == GIALLO ? GIALLO : ROSSO
            });
          },
          "mouseout": function () {
            div.css({
              backgroundColor: ""
            });
          },
          "click": function () {
            turno = (turno == GIALLO) ? ROSSO : GIALLO;
            scendi();
          }
        }
      });
    }
  }

  // Function to simulate a piece falling down a column
  function scendi() {
    let colonna = this.id.split("-")[1];

    for (let riga = 0; riga < RIGHE; riga++) {
      let id = `#div-${i}-${colonna}`;
      let div = $("#" + id);
      if (div[0].occupato) {
        break;
        
      }

    }
    if(riga==0){
        return;
    }
    let posIniziale={
        "position":"absolute",
        "top":5,
        "left":colonna*60,
        "backgroundColor":turno,
    }
    let posFinale={
      "position":"absolute",
      "top":60*riga,
      "left":colonna*60,
      "backgroundColor":turno,
  }
  $("<div>",{
    "class":"pedina",
    "css": posIniziale,
    "appendTo":wrapper
  })
  }

  // Function to create the grid of tokens (board layout)
  function creaPedine() {
    for (let i = 0; i < COLONNE; i++) {
      for (let j = 0; j < RIGHE; j++) {
        let div = $("<div>", {
          "class": "pedina",
          "appendTo": wrapper,
          "prop": {
            "id": i + "-" + j // Set the id as the column-row (e.g., 0-0, 0-1, etc.)
          }
        });
      }
    }
  }
});
