"use strict";

let headers = ["num", "nome", "nazione", "scuderia"];
let width = [30, 130, 100, 300];

window.onload = function() {
  let nazioni=[]
  const lstScuderie = document.getElementById("lstScuderie");
  const divNazioni = document.getElementById("divNazioni");
  let json = localStorage.getItem("./DB/f1_json");
  
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
  caricaNazioni() //No ripetizioni
  function caricaNazioni() {
    for (let scuderia in objFormula) {
        let team = objFormula[scuderia];
        
        team.piloti.forEach(pilota => {
            let nation = pilota.nazione; 
            
            if (nation && !nazioni.includes(nation)) {
    
                nazioni.push(nation);
                
               
            }
        });
    }
    nazioni.sort(); // ordina in ordine alfabetico
    for(const nation of nazioni) {
      let input = document.createElement("input");
      input.type = "checkbox";
      input.value = nation;
      
      let label = document.createElement("label");
      label.textContent = nation;
      
      divNazioni.appendChild(input);
      divNazioni.appendChild(label);
      //add br
      divNazioni.appendChild(document.createElement("br"));
    }
}


  function loadSelect() {
 
    const sortedScuderie = Object.keys(objFormula).sort();

    sortedScuderie.forEach(scuderia => {
      let opt = document.createElement("option");
      opt.value = scuderia;
      opt.innerHTML = scuderia;
      lstScuderie.appendChild(opt);
    });
  }
}
