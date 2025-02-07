"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const _lstCitta = document.getElementById("lstCitta");
  const _lstGeneri = document.getElementById("lstGeneri");
  const _tbody = document.querySelector("table tbody");
  const _divDettagli = document.getElementById("divDettagli");
  const containerCitta = _lstCitta.querySelector(".dropdown-menu");
  const containerGenere = _lstGeneri.querySelector(".dropdown-menu");

  let selectedType = {
    citta: "",
    genere: "",
  };
  let index = 1;
  let datiConcerti;
  let response = inviaRichiesta("GET", "/concerti");
  response.catch(errore);
  response.then(function (response) {
    datiConcerti = response.data;
    console.log(datiConcerti);
    creaTabella(selectedType);
  });
  caricaComboboxes();
  //   creaTabella();

  async function caricaComboboxes() {
    let responseCitta = await inviaRichiesta("GET", "/citta").catch(errore);
    let datiCitta = responseCitta.data;

    let responseGeneri = await inviaRichiesta("GET", "/generi").catch(errore);
    let datiGeneri = responseGeneri.data;
    console.log(datiCitta, datiGeneri);
    creaListCitta(datiCitta);
    creaListGeneri(datiGeneri);

    function creaListCitta(datiCitta) {
      let a = document.createElement("a");
      a.href = "#";
      a.textContent = "Tutti";
      a.addEventListener("click", function () {
        selectedType.genere = "";
        creaTabella(selectedType);
        console.log(selectedType);
      });
      containerCitta.appendChild(a);
      for (const currentCitta of datiCitta) {
        containerCitta.style.display = "block !important";
        containerCitta.style.flexDirection = " column";
        a = document.createElement("a");
        a.href = "#"; // !TODO: modificare href
        a.addEventListener("click", function () {
          selectedType.citta = currentCitta.citta;
          creaTabella(selectedType);
          console.log(selectedType);
        });
        a.textContent = currentCitta.citta;
        containerCitta.appendChild(a);
      }
    }
    function creaListGeneri(datiGeneri) {
      let a = document.createElement("a");
      a.href = "#";
      a.textContent = "Tutti";
      a.addEventListener("click", function () {
        selectedType.genere = "";
        creaTabella(selectedType);
        console.log(selectedType);
      });
      containerGenere.appendChild(a);
      for (const currentGenere of datiGeneri) {
        containerGenere.style.display = "block !important";
        containerGenere.style.flexDirection = " column";
        let a = document.createElement("a");
        a.href = "#"; // !TODO: modificare href
        a.addEventListener("click", function () {
          selectedType.genere = currentGenere.genere;
          creaTabella(selectedType);
          console.log(selectedType);
        });
        a.textContent = currentGenere.genere;
        containerGenere.appendChild(a);
      }
    }
  }

  function creaTabella(selectedType) {
    _tbody.innerHTML = "";
    let genere = selectedType.genere;
    let citta = selectedType.citta;
    for (const concerto of datiConcerti) {
      if (
        (genere && concerto.genere !== genere) ||
        (citta && concerto.sede.citta !== citta)
      ) {
        continue; // Salta i concerti che non rispettano il filtro
      }
      let tr = document.createElement("tr");
      let td = document.createElement("td");
      td.textContent = index++;
      tr.appendChild(td);
      _tbody.appendChild(tr);

      td = document.createElement("td");
      td.textContent = concerto.cantante;
      tr.appendChild(td);

      td = document.createElement("td");
      td.textContent = concerto.data;
      tr.appendChild(td);

      td = document.createElement("td");
      td.textContent = concerto.genere;
      tr.appendChild(td);

      td = document.createElement("td");
      td.textContent = concerto.sede.citta;
      tr.appendChild(td);

      td = document.createElement("td");
      td.textContent = concerto.sede.struttura;
      tr.appendChild(td);

      td = document.createElement("td");
      let btnDettagli = document.createElement("button");
      btnDettagli.textContent = "Dettagli";
      btnDettagli.classList.add("btn", "btn-info", "btn-xs");
      btnDettagli.addEventListener("click", function () {
        displayDettagli(concerto);
      });
      td.appendChild(btnDettagli);
      tr.appendChild(td);

      td = document.createElement("td");
      let btnPrenota = document.createElement("button");
      btnPrenota.textContent = "Prenota";
      btnPrenota.addEventListener("click", function(){
        prenotaConcerto(concerto)
      })
      btnPrenota.classList.add("btn", "btn-success", "btn-xs");
      td.appendChild(btnPrenota);
      tr.appendChild(td);
    }

    function displayDettagli(concerto) {
      _divDettagli.innerHTML = "";
      let h3 = document.createElement("h3");
      h3.textContent = "Dettagli del concerto";
      _divDettagli.appendChild(h3);
      let span = document.createElement("span");
      span.style.paddingTop="12px"
      span.innerHTML = "<b>Data:</b> " + concerto.data+"<br/>";
      _divDettagli.appendChild(span);

      span = document.createElement("span");
      span.style.paddingTop="12px"
      span.innerHTML = "<b>Citta:</b> " + concerto.sede.citta+"<br/>";
      _divDettagli.appendChild(span);

      span = document.createElement("span");
      span.style.paddingTop="12px"
      span.innerHTML = "<b>Struttura:</b> " + concerto.sede.struttura+"<br/>";
      _divDettagli.appendChild(span);

      span = document.createElement("span");
      span.style.padding="12px 0"
      let nPosti=parseInt(concerto.sede.nPosti)
      let postiPrenotati=parseInt(concerto.postiPrenotati)
      console.log(nPosti, postiPrenotati)
      span.innerHTML = "<b>Posti liberi:</b> "+(nPosti-postiPrenotati)+"<br/>"
      _divDettagli.appendChild(span);


      let okButton = document.createElement("button");
      okButton.textContent = "Ok";
      okButton.addEventListener("click", function () {
        _divDettagli.innerHTML=""
      });
      okButton.classList.add("btn", "btn-success");
      _divDettagli.appendChild(okButton);
      console.log(span);
    }
    function prenotaConcerto(concerto) {
        let biglietti=prompt("Inserisci quanti biglietti da comprare")
        if(isNaN(biglietti) || biglietti<=0) return alert("Devi inserire un numero maggiore di 0")
        let idConcerto=concerto.id
        let postiPrenotati=parseInt(concerto.postiPrenotati)
        aggiorna()
        async function aggiorna(){
            try {
                let response = await inviaRichiesta("PATCH", `/concerti/${idConcerto}`, {postiPrenotati: postiPrenotati+biglietti})
            let data = response.data;
            console.log(data);
            creaTabella(selectedType)
            alert("Congratulazioni, hai comprato il/i biglietti!")
            } catch (error) {
                alert(error)
            }
        }

    }
  }
});
