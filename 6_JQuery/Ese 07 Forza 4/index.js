"use strict";
const RIGHE = 6;
const COLONNE = 7;
const GIALLO = "#FF0";
const ROSSO = "#F00";
let turno = GIALLO;

// Initialize an empty board
let board = [];
for (let i = 0; i < RIGHE; i++) {
  board[i] = [];
  for (let j = 0; j < COLONNE; j++) {
    board[i][j] = null; // null means the cell is empty
  }
}

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
              backgroundColor: "#BBB"
            });
          },
          "click": function () {
            // Drop the piece in the clicked column
            scendi(i);
            // Toggle player turn
            turno = (turno == GIALLO) ? ROSSO : GIALLO;
          }
        }
      });
    }
  }

  // Function to simulate a piece falling down a column
  function scendi(colonna) {

  }

  // Function to create the grid of tokens (board layout)
  function creaPedine() {
    for (let i = 0; i < COLONNE; i++) {
      for (let j = 0; j < RIGHE; j++) {
        let div = $("<div>", {
          "class": "pedina",
          "appendTo": wrapper,
          "id": i + "-" + j // Set the id as the column-row (e.g., 0-0, 0-1, etc.)
        });
      }
    }
  }
});
