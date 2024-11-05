"use strict";

let headers = ["num", "nome", "nazione", "scuderia"];
let width = [30, 130, 100, 300];

window.onload = function () {
  let nazioni = [];
  const lstScuderie = document.getElementById("lstScuderie");
  const divNazioni = document.getElementById("divNazioni");
  const divDettagli = document.getElementById("divDettagli");
  let json = localStorage.getItem("./DB/f1_json");
  let table = document.getElementsByTagName("table")[0];

  let selectedScuderia = "";
  let selectedCheckbox="selected"
  if (!json) {
    json = database;
  }

  let objFormula = JSON.parse(json);
  console.log(objFormula);
  /* "Mercedes-AMG Petronas Formula One Team": {
    "pneumatici": "Pirelli",
    "motore": "Mercedes",
    "piloti": [
      {
        "nome": "Lewis Hamilton",
        "numero": 44,
        "nazione": "Regno Unito",
        "data_di_nascita": "7 gennaio 1985",
		"img":".jpg"
      },
      {
        "nome": "Valtteri Bottas",
        "numero": 77,
        "nazione": "Finlandia",
        "data_di_nascita": "28 agosto 1989",
		"img":".jpg"
      }
    ]
  }, */
  loadSelect();
  caricaNazioni(); //No ripetizioni
  loadPilot();
  function caricaNazioni() {
    for (let scuderia in objFormula) {
      let team = objFormula[scuderia];

      team.piloti.forEach(function(pilota){
        let nation = pilota.nazione;

        if (nation && !nazioni.includes(nation)) {
          nazioni.push(nation);
        }
      });
    }
    nazioni.sort(); // ordina in ordine alfabetico
    for (const nation of nazioni) {
      let input = document.createElement("input");
      input.type = "checkbox";
      input.value = nation;
      input.name = "naz";

      let label = document.createElement("label");
      // label.for="naz"
      label.textContent = nation;

      divNazioni.appendChild(input);
      divNazioni.appendChild(label);
      //add br
      divNazioni.appendChild(document.createElement("br"));
      //click
      input.addEventListener("click", function () {
        let checked = this.checked;
        if (checked) {
          for (let i = 0; i < divNazioni.children.length; i++) {
            divNazioni.children[i].checked = false;
          }
          this.checked = true;
        }
        selectedCheckbox=this.value
        console.log(selectedCheckbox)
        lstScuderie.selectedIndex=0;
      });
      
    }
 
  }

  function loadSelect() {
    const sortedScuderie = Object.keys(objFormula).sort();
    //selected index -1

    let opt=document.createElement("option");
    opt.value = "";
    opt.innerHTML = "Tutte";
    lstScuderie.appendChild(opt);
    sortedScuderie.forEach((scuderia) => {
       opt = document.createElement("option");
      opt.value = scuderia;
      opt.innerHTML = scuderia;
      lstScuderie.appendChild(opt);
    });

    lstScuderie.addEventListener("change", function () {
      selectedScuderia = this.value;
      //deselect all checkboxes
      for (let i = 0; i < divNazioni.children.length; i++) {
        divNazioni.children[i].checked = false;
      }
      
      console.log(selectedScuderia);
      loadPilot();
    });
  }

  function loadPilot() {
    table.innerHTML = "";
    // Carica l'intestazione della tabella
    let trHeader = document.createElement("tr");
    headers.forEach((header, index) => {
      let th = document.createElement("th");
      th.textContent = header;
      th.style.width = width[index] + "px";
      trHeader.appendChild(th);
    });
    table.appendChild(trHeader);

     if (selectedScuderia ) {
      let team = objFormula[selectedScuderia]; // Ottieni il team selezionato
     }
     else if(selectedCheckbox){
      let team = objFormula[selectedCheckbox]; // Ottieni il team selezionato
     }
     else{
       console.log("Nessuna scuderia selezionata");
       return;
     }
      for (const pilota of team.piloti) {
        let tr = document.createElement("tr"); 

        let tdNum = document.createElement("td");
        tdNum.textContent = pilota.numero; 
        tr.appendChild(tdNum);

        let tdNome = document.createElement("td");
        let span = document.createElement("span");
        span.textContent = pilota.nome;
        span.addEventListener("click", function(){
          // Qui puoi caricare i dettagli del pilota se necessario
          console.log(`Dettagli per ${pilota.nome}`);
        });
        tdNome.appendChild(span);
        tr.appendChild(tdNome);

        let tdNazione = document.createElement("td");
        tdNazione.textContent = pilota.nazione; 
        tr.appendChild(tdNazione);

        let tdScuderia = document.createElement("td");
        tdScuderia.textContent = selectedScuderia; 
        tr.appendChild(tdScuderia);

        table.appendChild(tr);
      }
    }
  
  
};
