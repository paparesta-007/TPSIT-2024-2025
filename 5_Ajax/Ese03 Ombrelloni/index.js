"use strict";
const RIGHE = 18
const COLONNE = 37
const X_OFFSET = 180
const Y_OFFSET = 210;
const MMG = 24*60*60*1000 // msec in un giorno = 86.400.000


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
   _dataFine.disabled=true;
   _btnVisualizzaMappa.disabled=true;
   
   //Funzione per il login
   const inputs=_login.querySelectorAll("input")
   btnLogin.addEventListener("click", function () {
      const nome=inputs[0].value
      const password=inputs[1].value

      if(nome && password){
         let request=inviaRichiesta("GET","/utenti",{nome: nome, password: password })
         request.catch(errore);
         request.then(function(response){
            if(response.data.length>0){
               const utente=response.data[0]
               console.log(utente)
               user_id=utente.id
               $(_login).hide()
               $(_wrapper).show()

            }
            else{
               const p=document.getElementsByTagName("p")[0].textContent="Inserire utente e password"
            }
         })
      }
      else{
         alert("Inserire utente e password")
      }
   })

   _dataInizio.addEventListener("change", function () {
      _dataFine.disabled=false;
      _dataFine.min=_dataInizio.value  
      _dataFine.value=this.value
      _btnVisualizzaMappa.disabled=false;
      _btnVisualizzaMappa.classList.add("buttonEnabled")
      if(this.value && _dataFine.value){

      }
      else{
         _btnVisualizzaMappa.disabled=true;
         _btnVisualizzaMappa.classList.remove("buttonEnabled")
         _dataFine.disabled=true;
      }
   })

   _btnVisualizzaMappa.addEventListener("click", function () {
      $(_mappa).slideDown(1000)
   })
})