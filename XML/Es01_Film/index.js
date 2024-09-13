"use strict";

const films = [
  // Id, Title, Favorite, Watch date, Rating (0-5)
  [1, "Pulp Fiction", true, "10-03-2024", 5],
  [2, "21 Grammi", true, "17-03-2024", 3],
  [3, "Star Wars", false, "15-03-2024", 1],
  [4, "Matrix", false, "01-01-2023", 4],
  [5, "Shrek", false, "21-03-2024", 2],
  [6, "Kill Bill Vol. 1", true, "22-04-2024", 5],
  [7, "Inception", true, "18-04-2024", 3],
];

window.onload = function () {
  let _tbody = document.querySelector("tbody");
  let _btnAdd = document.querySelector("#btn-add");
  let _btnClear = document.querySelector("#btn-clear");
  let _btnReload = document.querySelector("#btn-reload");

  _btnAdd.addEventListener("click", aggiungiFilm);
  function aggiungiFilm() {}

  visualizza();

  function visualizza() {
    for (let i = 0; i < films.length; i++) {
      let riga = document.createElement("tr");
      _tbody.appendChild(riga);

      for (let j = 0; j < films[i].length; j++) {
        let td = document.createElement("td");

        // Caso checkbox per il terzo elemento
        if (j == 2) {
          let chk = document.createElement("input");
          chk.type = "checkbox";
          chk.checked = films[i][j];
          chk.disabled = true;
          td.appendChild(chk);
        } else if (j == 4) {
          //se sono nella colonna del rating
          let contStelle = films[i][j];
          for (let k = 0; k < contStelle; k++) {
            td.textContent += "★";
          }
          for (let l = 0; l < 5 - contStelle; l++) {
            // stampa stelle vuote rimanenti se voto non è 5/5
            td.textContent += "☆";
          }
        } else {
          td.textContent = films[i][j];
        }

        riga.appendChild(td);
      }
    }
  }
};
