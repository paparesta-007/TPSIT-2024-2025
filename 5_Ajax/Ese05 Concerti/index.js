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
        selectedType.citta = "";
        _lstCitta.querySelector("button").textContent = "Tutti";
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
          _lstCitta.querySelector("button").textContent = currentCitta.citta; 
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
        _lstGeneri.querySelector("button").textContent = "Tutti";

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
          _lstGeneri.querySelector("button").textContent = currentGenere.genere;
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
      let nPosti = parseInt(concerto.sede.nPosti)
      let postiPrenotati = parseInt(concerto.postiPrenotati)
      let postiLiberi = nPosti - postiPrenotati
      
      Swal.fire({
        title: 'Dettagli del concerto',
        html: `
          <b>Data:</b> ${concerto.data}<br>
          <b>Città:</b> ${concerto.sede.citta}<br>
          <b>Struttura:</b> ${concerto.sede.struttura}<br>
          <b>Posti liberi:</b> ${postiLiberi}
        `,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#28a745'
      });
    }
    function prenotaConcerto(concerto) {
        let biglietti=prompt("Inserisci quanti biglietti da comprare")
        // max 10 ticket
        if(parseInt(biglietti)>10) return alert("Puoi comprare al massimo 10 biglietti")
        let idConcerto=concerto.id
        let postiPrenotati=parseInt(concerto.postiPrenotati)
        aggiorna()
        async function aggiorna(){
            try {
                let response = await inviaRichiesta("PATCH", `/concerti/${idConcerto}`, {postiPrenotati: postiPrenotati+biglietti})
            let data = response.data;
            console.log(data);
            creaTabella(selectedType)
            
            alert(`Congratulazioni, hai comprato ${biglietti} biglietti!`)
            } catch (error) {

                alert(error)
            }
        }

    }
  }
});
