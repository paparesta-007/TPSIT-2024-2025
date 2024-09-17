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
  let _btnAdd = document.getElementById("btn-add");
  let _btnClear = document.getElementById("btn-clear");
  let _btnReload = document.getElementById("btn-reload");
  let _btnCount = document.getElementById("btn-count");
  let _btnLogin = document.getElementById("btn-login");

  _btnAdd.addEventListener("click", aggiungiFilm);
  _btnClear.addEventListener("click", function () {
    _tbody.innerHTML = "";
  });
  _btnReload.addEventListener("click", function () {
    window.location.reload();
  });
  _btnCount.addEventListener("click", function () {
    const spanN = document.getElementById("span-n-films");
    spanN.innerText = films.length;
    const modalCount = new bootstrap.Modal(
      document.getElementById("modal-count-films")
    );
    modalCount.show();
  });

  _btnLogin.addEventListener("click", function () {
    console.log("Login");
    visualizzaLogin();
    setTimeout(nascondiLogin, 3000);
  });
  function visualizzaLogin() {
    let alertLogin = document.getElementById("alert-login");
    alertLogin.classList.remove("d-none");
  }
  function nascondiLogin() {
    let alertLogin = document.getElementById("alert-login");
    alertLogin.classList.add("d-none");
  }

  visualizza();

  function visualizza() {
    _tbody.innerHTML = "";

    for (let i = 0; i < films.length; i++) {
      let riga = document.createElement("tr");
      _tbody.appendChild(riga);

      for (let j = 0; j < films[i].length; j++) {
        let td = document.createElement("td");

        if (j == 2) {
          let chk = document.createElement("input");
          chk.type = "checkbox";
          chk.checked = films[i][j];
          chk.disabled = true;
          td.appendChild(chk);
        } else if (j == 4) {
          for (let k = 0; k < 5; k++) {
            const icon = document.createElement("i");
            icon.classList.add("bi");
            if (k < films[i][j]) icon.classList.add("bi-star-fill");
            else icon.classList.add("bi-star");
            td.appendChild(icon);
          }
        } else {
          td.textContent = films[i][j];
        }

        riga.appendChild(td);
      }
    }
  }

  function aggiungiFilm() {
    let id = films.length + 1;
    let title = prompt("Inserisci il nome del film: ");
    let favourite = Math.random(0, 2);
    let date = new Date();
    let strDate = date.toLocaleDateString();
    let rating = random(1, 6);

    let rigaNuova = [id, title, favourite, strDate, rating];
    films.push(rigaNuova);

    visualizza();
  }

  function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
};
