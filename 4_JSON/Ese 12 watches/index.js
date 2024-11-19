"use strict";
let headers = ["Gender", "Code", "Price", "Color", "Image"];

window.onload = function () {
  // Riferimenti agli elementi DOM
  let thead = document.querySelector("table thead");
  let tbody = document.querySelector("table tbody");
  let lstGender = document.querySelector(".gender select");
  let btnInserisci = document.getElementsByTagName("button")[0];
  btnInserisci.onclick =function(){ 
    window.location.href="inserisci.html"; // Apre la pagina di inserimento
  }

  // Variabile per memorizzare il genere selezionato
  let gender = "";

  // Eseguiamo il parsing dei dati JSON per ottenere un oggetto JavaScript
  let objOrologi = JSON.parse(orologi);

  // Evento per il cambiamento del genere
  lstGender.addEventListener("change", function () {
    gender = this.value; // Impostiamo il valore del genere selezionato
    console.log(gender);
    loadTable(); // Ricarica la tabella con il filtro del genere
  });

  // Caricamento delle intestazioni e della tabella
  loadHeaders();
  loadTable();

  // Funzione per caricare le intestazioni della tabella
  function loadHeaders() {
    thead.innerHTML = ""; // Pulisce l'intestazione
    let tr = document.createElement("tr");
    thead.appendChild(tr);
    for (const header of headers) {
      const th = document.createElement("th");
      th.textContent = header;
      tr.appendChild(th);
    }
  }

  // Funzione per caricare i dati nella tabella
  function loadTable() {
    tbody.innerHTML = ""; // Pulisce il corpo della tabella

    // Itera sugli orologi (oggetti all'interno dell'array objOrologi)
    for (const item of objOrologi) {
      // Se il genere selezionato è vuoto o corrisponde al genere dell'oggetto, procediamo
      if (gender === "" || gender === item.gender) {
        // Itera sui modelli del genere
        for (const model of item.models) {
          // Itera sugli orologi di ciascun modello
          for (const watch of model.watches) {
            const tr = document.createElement("tr");
            tbody.appendChild(tr);

            // Crea e aggiungi le celle alla riga
            let td = document.createElement("td");
            td.textContent = item.gender; // Aggiungi il genere
            tr.appendChild(td);
            td.style.textAlign = "center";
            td = document.createElement("td");
            td.textContent = model.code; // Aggiungi il codice del modello
            tr.appendChild(td);
            td.style.textAlign = "center";
            td = document.createElement("td");
            td.textContent = model.price; // Aggiungi il prezzo del modello
            tr.appendChild(td);
            td.style.textAlign = "center";
            td = document.createElement("td");
            td.textContent = watch.color; // Aggiungi il colore dell'orologio
            tr.appendChild(td);
            td.style.textAlign = "center";
            td = document.createElement("td");
            td.style.textAlign = "center";

            let img = document.createElement("img");
            img.src = `./img/${watch.image.toLowerCase()}`;
            // img.style.backgroundSize="cover";

            td.appendChild(img);
            tr.appendChild(td);
          }
        }
      }
    }
  }
};
