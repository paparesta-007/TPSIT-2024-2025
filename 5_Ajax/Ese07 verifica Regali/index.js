"use strict";

document.addEventListener("DOMContentLoaded", function () {
  let _page1 = document.getElementById("PAGE1");
  let _page1Data = document.getElementById("PAGE1_DATA");
  let _page2 = document.getElementById("PAGE2");
  let _page2Data = document.getElementById("PAGE2_DATA");
  let _page3 = document.getElementById("PAGE3");
  let _page3Data = document.getElementById("PAGE3_DATA");
  let regaloVincente;
  $(_page2).hide();
  $(_page3).hide();
  $("span").eq(0).hide();
  caricaCitta();

  function caricaCitta() {
    let request = inviaRichiesta("GET", "/citta");
    request.catch(errore);
    request.then(function (HTTPresponse) {
      console.log(HTTPresponse.data);
      let citta = HTTPresponse.data;
      let radio;
      let label;
      let formCheck;
      for (const item of citta) {
        formCheck = document.createElement("div");
        radio = document.createElement("input");
        radio.type = "radio";
        radio.classList.add("form-check-input");
        radio.name = "citta";
        radio.id = item.id;
        radio.dataset.nomeCitta = item.nome;

        label = document.createElement("label");
        label.textContent = item.nome;
        label.htmlFor = radio.id;

        formCheck.appendChild(radio);
        formCheck.appendChild(label);

        $(formCheck).insertBefore($("#btnInvia"), formCheck);
      }
      formCheck = document.createElement("div");
      radio = document.createElement("input");
      radio.type = "radio";
      radio.classList.add("form-check-input");
      radio.name = "citta";
      radio.id = -1;

      label = document.createElement("label");
      label.textContent = "purtroppo no";
      label.htmlFor = radio.id;

      formCheck.appendChild(radio);
      formCheck.appendChild(label);

      $(formCheck).insertBefore($("#btnInvia"), formCheck);
    });
  }
  
  let btnInvia = document.getElementById("btnInvia");
  btnInvia.addEventListener("click", function () {
    if ($("input[type='radio']:checked").length != 0) {
      if (document.querySelector("input[name='citta']:checked").id == -1) {
        $("span").eq(0).show();
        return;
      } else {
        $("span").eq(0).hide();
        let requestNegozi = inviaRichiesta("GET", "/negozi", {
          citta: document.querySelector("input[name='citta']:checked").dataset
            .nomeCitta,
        });
        requestNegozi.catch(errore);
        requestNegozi.then(function (HTTPresponseNegozi) {
          console.log(HTTPresponseNegozi.data);

          let regaloIds = [];
          
          // Loop through all stores and get the gifts' IDs
          for (let negozio of HTTPresponseNegozi.data) {
            inviaRichiesta("GET", "/regali", {codNegozio: negozio.id,})
            .then(function (response) {
                let regali = response.data;
                for (let regalo of regali) 
                {
                  regaloIds.push(regalo.id);
                }

              // Pick a random gift ID from the array
              if (regaloIds.length > 0) {
                let n = random(0, regaloIds.length - 1);
                let selectedRegaloId = regaloIds[n];

                // Fetch the selected regalo data
                inviaRichiesta("GET", "/regali/" + selectedRegaloId)
                  .then(function (regaloData) {
                    regaloVincente = regaloData.data;
                    console.log("Random regalo:", regaloVincente);
                    _page1.style.display = "none";
                    _page2.style.display = "block";

                    _page2.querySelector("img").src =
                      "./img/img" + regaloVincente.id + ".jpg";
                    _page2
                      .querySelectorAll("p")[0]
                      .querySelectorAll("span")[1].textContent = regaloVincente.nome;
                    _page2
                      .querySelectorAll("p")[1]
                      .querySelectorAll("span")[1].textContent =
                      regaloVincente.descrizione;

                    let request = inviaRichiesta("GET", "/negozi/", {
                      id: regaloVincente.codNegozio,
                    }).catch(errore);
                    request.then(function (response) {
                      console.log(response.data);
                      let negozio = response.data[0];
                      visualizza(negozio.nome, negozio.indirizzo);
                    });
                    
                    function visualizza(nome, indirizzo) {
                      _page2
                        .querySelectorAll("p")[3]
                        .querySelectorAll("span")[1].textContent = nome;
                      _page2
                        .querySelectorAll("p")[4]
                        .querySelectorAll("span")[1].textContent = indirizzo;
                    }
                  })
                  .catch(errore);
              }
            }).catch(errore);
          }
        });
      }
    } else {
      alert("Seleziona una città");
    }
  });

  document.querySelector("#btnConferma").addEventListener("click", function () {
    if (regaloVincente) {
      let datiIndirizzo;
      let requestDataMap = inviaRichiesta("GET", "/negozi/", {
        id: regaloVincente.codNegozio,
      }).catch(errore);
      requestDataMap.then(function (response) {
        console.log(response.data);
        datiIndirizzo = response.data[0];
        let qrcodeData = {
          IDRegalo: regaloVincente.id,
          descrizione: regaloVincente.descrizione,
          indirizzo: datiIndirizzo.indirizzo,
          negozio: datiIndirizzo.nome,
          nome: regaloVincente.nome,
        };
        console.log(qrcodeData);
        $(_page3).show();
        let divQr = _page3.querySelector("div");
        $(divQr).qrcode({
          text: JSON.stringify(qrcodeData),
        });
        $(_page2).hide();
        let request = inviaRichiesta("DELETE", "/regali/" + regaloVincente.id);
        request.catch(errore);
        request.then(function (response) {
        });
      });
    }
  });
});

function random(min, max) {
  return Math.floor((max - min + 1) * Math.random() + min);
}
