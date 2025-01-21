"use strict";
const RIGHE = 18
const COLONNE = 37
const X_OFFSET = 180
const Y_OFFSET = 210;
const MMG = 24 * 60 * 60 * 1000 // msec in un giorno = 86.400.000


$(document).ready(function () {
   let _login = document.getElementById("login");
   let _msg = document.getElementById("wrapper").getElementsByTagName("label")[2];
   let btnLogin = document.getElementById("btnLogin");
   let _wrapper = document.getElementById("wrapper");
   let _mappa = _wrapper.getElementsByTagName("div")[0];
   let _btnVisualizzaMappa = _wrapper.getElementsByTagName("button")[0];
   let _dataInizio = _wrapper.getElementsByTagName("input")[0];
   let _dataFine = _wrapper.getElementsByTagName("input")[1];

   let user_id;
   let ombrelloni;


   $(_login).show();
   $(_wrapper).hide()
   $(_mappa).hide()
   _dataFine.disabled = true;
   _btnVisualizzaMappa.disabled = true;

   //Funzione per il login
   const inputs = _login.querySelectorAll("input")
   btnLogin.addEventListener("click", function () {
      const nome = inputs[0].value
      const password = inputs[1].value

      if (nome && password) {
         let request = inviaRichiesta("GET", "/utenti", { nome: nome, password: password })
         request.catch(errore);
         request.then(function (response) {
            if (response.data.length > 0) {
               const utente = response.data[0]
               console.log(utente)
               user_id = utente.id
               $(_login).hide()
               $(_wrapper).show()

            }
            else {
               const p = document.getElementsByTagName("p")[0].textContent = "Inserire utente e password"
            }
         })
      }
      else {
         alert("Inserire utente e password")
      }
   })

   _dataInizio.addEventListener("change", function () {
      _dataFine.disabled = false;
      _dataFine.min = _dataInizio.value
      _dataFine.value = this.value
      _btnVisualizzaMappa.disabled = false;
      _btnVisualizzaMappa.classList.add("buttonEnabled")
      if (this.value && _dataFine.value) {

      }
      else {
         _btnVisualizzaMappa.disabled = true;
         _btnVisualizzaMappa.classList.remove("buttonEnabled")
         _dataFine.disabled = true;
      }
   })

   _btnVisualizzaMappa.addEventListener("click", function () {
      $(_mappa).slideDown(1000)
      caricaOmbrelloni();
   })

   function caricaOmbrelloni() {
      let request = inviaRichiesta("GET", "/ombrelloni")
      request.catch(errore);
      request.then(function (response) {
         ombrelloni = response.data
         console.log(ombrelloni)
         _mappa.innerHTML = ""
         let dateInizio = new Date(_dataInizio.value)
         let dateFine = new Date(_dataFine.value)

         let nGiorni = ((dateFine - dateInizio) / MMG) + 1
         let posIniziale = (dateInizio - new Date(_dataInizio.min)) / (MMG)
         let posFinale = (dateFine - new Date(_dataInizio.min)) / (MMG)
         console.log(nGiorni)
         let id = 0;

         for (let riga = 0; riga < RIGHE + 1; riga++) {
            let y = Y_OFFSET + 16 * riga

            for (let col = 0; col < COLONNE + 1; col++) {
               if (col != 22 && riga != 9) {
                  let x = X_OFFSET + 16 * col
                  const div = document.createElement("div")
                  div.classList.add("ombrellone")
                  div.style.left = x - (2 * riga)
                  div.style.top = y
                  div.id = id++
                  _mappa.appendChild(div)
                  if (isOccupato(div.id, posIniziale, posFinale)) {
                     div.style.backgroundColor = "red"
                  }
                  else {
                     div.addEventListener("click", gestisciOmbrellone)
                  }
               }
            }
         }
      })
   }
   function isOccupato(id, posIniziale, posFinale) {

   }
})