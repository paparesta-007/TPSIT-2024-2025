"use strict";

$(document).ready(function () {
  let _page1 = document.getElementById("PAGE1");
  let _page1Data = document.getElementById("PAGE1_DATA");
  let _page2 = document.getElementById("PAGE2");
  let _page2Data = document.getElementById("PAGE2_DATA");
  let _page3 = document.getElementById("PAGE3");
  let _page3Data = document.getElementById("PAGE3_DATA");

  $(_page2).hide();
  $(_page3).hide();
  let spanNienteCitta = $("span").eq(0);
  spanNienteCitta.hide();

  caricaCitta();

  function caricaCitta() {
    let request = inviaRichiesta("GET", "/citta").catch(errore);
    request.then(function (response) {
      console.log(response.data);

      let vetCitta = response.data;
      for (const citta of vetCitta) {
        let div = document.createElement("div");
        div.classList.add("form-check");
        // _page1Data.appendChild(div);

        let radio = document.createElement("input");
        radio.classList.add("form-check-input");
        radio.type = "radio";
        radio.name = "citta";
        radio.value = citta.nome;
        radio.dataset.nome = citta.nome;
        radio.id = citta.id;

        let label = document.createElement("label");
        label.textContent = citta.nome;
        label.classList.add("form-check-label");
        label.htmlFor = citta.id;

        div.appendChild(radio);
        div.appendChild(label);
        $(div).insertBefore($("#btnInvia"));
      }
      let div = document.createElement("div");
      div.classList.add("form-check");
      // _page1Data.appendChild(div);

      let radio = document.createElement("input");
      radio.classList.add("form-check-input");
      radio.type = "radio";
      radio.name = "citta";
      radio.value = "niente";
      radio.id = "niente";

      let label = document.createElement("label");
      label.textContent = "purtroppo no";
      label.classList.add("form-check-label");
      label.htmlFor = "niente";
      div.appendChild(radio);
      $(div).insertBefore($("#btnInvia"));
      div.appendChild(label);
    });
  }
  let btnInvia = document.getElementById("btnInvia");
  btnInvia.addEventListener("click", function () {
    if (document.querySelector("input[name='citta']:checked") == null) {
      Swal.fire({
        title: "Errore",
        text: "Seleziona una città",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    } else {
      let value = document.querySelector("input[name='citta']:checked").value;
    //   console.log(value);
      if (value == "niente") {
        spanNienteCitta.show();
      } else {
        spanNienteCitta.hide();
        trovaVincente(value);
      }
    }
  });

  function trovaVincente(nomeCitta) {
    let request = inviaRichiesta("GET", "/negozi", { citta: nomeCitta }).catch(errore);

    request.then(function (response) {
        let negozi = response.data;
        let vetIdRegali = [];
        let promises = []; // Array per raccogliere tutte le Promises

        console.log("Numero di negozi trovati:", negozi.length);

        for (const negozio of negozi) {
        let promise = inviaRichiesta("GET", "/regali", { codNegozio: negozio.id }).catch(errore);
        promise.then(function (response) {
                let regali = response.data;
                for (const regalo of regali) {
                    vetIdRegali.push(regalo);
                }
            })
            promises.push(promise); 
        }
        let requestNegozio
        let negozio
        let regaloVincente
        Promise.all(promises).then(function(){
            $(_page1).hide();
            $(_page2).show();
            regaloVincente= vetIdRegali[random(0, vetIdRegali.length - 1)];
            console.log(regaloVincente);
            let spanNome=_page2Data.getElementsByTagName("p")[0].getElementsByTagName("span")[1];
            spanNome.textContent=regaloVincente.nome;
            
            let spanDescr=_page2Data.getElementsByTagName("p")[1].getElementsByTagName("span")[1];
            spanDescr.textContent=regaloVincente.descrizione;

            requestNegozio = inviaRichiesta("GET", "/negozi/", {id: regaloVincente.codNegozio}).catch(errore);
              request.then(function (response) {
                console.log(response.data);
                negozio= response.data[0];
                
                let spanNomeNegozio=_page2Data.querySelectorAll("p")[3].querySelectorAll("span")[1];
                spanNomeNegozio.textContent=negozio.nome;
    
                let spanIndirizzo=_page2Data.querySelectorAll("p")[4].querySelectorAll("span")[1];
                spanIndirizzo.textContent=negozio.indirizzo;
              });
            _page2Data.getElementsByTagName("img")[0].src = "./img/img"+regaloVincente.id+".jpg";
        }); 
        document.querySelector("#btnConferma").addEventListener("click", function () {
            $(_page2).hide()
            $(_page3).show();
    
            let json={
                IDRegalo: regaloVincente.id,
                descrizione: regaloVincente.descrizione,
                indirizzo: negozio.indirizzo,
                negozio: negozio.nome,
                nome: regaloVincente.nome
            }
            console.log(json)
            JSON.stringify(json);
           
            let qrDiv=_page3Data.querySelector("div")
            $(qrDiv).qrcode(
                {
                    text :JSON.stringify(json),
                }
            )
        })
    });

   
}

});

function random(min, max) {
  return Math.floor((max - min + 1) * Math.random() + min);
}
