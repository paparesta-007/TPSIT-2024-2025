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
  const btnTutti=document.getElementsByTagName("button") [0];
  btnTutti.addEventListener("click",function () {
    selectedCheckbox="";
    selectedScuderia="";
    loadPilot();
  })
  let selectedScuderia = "";
  let selectedCheckbox = ""; // memorizza la nazione selezionata
  if (!json) {
    json = database;
  }

  let objFormula = JSON.parse(json);
  console.log(objFormula);

  loadSelect();
  caricaNazioni(); // Evita ripetizioni
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
    nazioni.sort(); // Ordina in ordine alfabetico
    for (const nation of nazioni) {
      let input = document.createElement("input");
      input.type = "checkbox";
      input.value = nation;
      input.name = "naz";

      let label = document.createElement("label");
      label.textContent = nation;

      divNazioni.appendChild(input);
      divNazioni.appendChild(label);
      divNazioni.appendChild(document.createElement("br"));

      // Evento click sul checkbox
      input.addEventListener("click", function () {
        selectedCheckbox = this.checked ? this.value : "";
        
        // Deseleziona tutti gli altri checkbox
        for (let i = 0; i < divNazioni.children.length; i++) {
          if (divNazioni.children[i].type === "checkbox" && divNazioni.children[i] !== this) {
            divNazioni.children[i].checked = false;
          }
        }
        
        lstScuderie.selectedIndex = 0; // Resetta la selezione delle scuderie
        loadPilot(); // Aggiorna la tabella in base al filtro
      });
    }
  }

  function loadSelect() {
    const sortedScuderie = Object.keys(objFormula).sort();
    let opt = document.createElement("option");
    opt.value = "";
    opt.innerHTML = "Tutte";
    lstScuderie.appendChild(opt);

    sortedScuderie.forEach(function(scuderia)  {
      opt = document.createElement("option");
      opt.value = scuderia;
      opt.innerHTML = scuderia;
      lstScuderie.appendChild(opt);
    });

    lstScuderie.addEventListener("change", function () {
      selectedScuderia = this.value;
      
      // Deseleziona tutti i checkbox quando una scuderia è selezionata
      for (let i = 0; i < divNazioni.children.length; i++) {
        if (divNazioni.children[i].type === "checkbox") {
          divNazioni.children[i].checked = false;
        }
      }

      selectedCheckbox = ""; // Resetta la selezione della nazione
      loadPilot();
    });
  }

  function loadPilot() {
    table.innerHTML = "";

    let trHeader = document.createElement("tr");
    headers.forEach((header, index) => {
      let th = document.createElement("th");
      th.textContent = header;
      th.style.width = width[index] + "px";
      trHeader.appendChild(th);
    });
    table.appendChild(trHeader);

    for (let scuderia in objFormula) {
      let team = objFormula[scuderia];
      for (const pilota of team.piloti) {

        if (
          (selectedScuderia && selectedScuderia !== scuderia) || 
          (selectedCheckbox && pilota.nazione !== selectedCheckbox)
        ) {
          continue;
        }

        let tr = document.createElement("tr");

        let tdNum = document.createElement("td");
        tdNum.textContent = pilota.numero;
        tr.appendChild(tdNum);

        let tdNome = document.createElement("td");
        let span = document.createElement("span");
        span.textContent = pilota.nome;
        span.addEventListener("click", function () {
          divDettagli.innerHTML = "";
          divDettagli.style.display = "flex";
          let img=document.createElement("img");
          //float left
          // img.style.float="left";
          img.src=`./img/${pilota.nome}.jpg`;
          img.addEventListener("error", function(){
            img.src="./img/user.png";
          })
          divDettagli.appendChild(img);

         let divDettagliRight=document.createElement("div");
          divDettagli.appendChild(divDettagliRight);
          // divDettagliRight.style.float="right";
          let p = document.createElement("p");
          divDettagliRight.appendChild(p);
          let b= document.createElement("b");
          b.textContent = `${pilota.numero} - ${pilota.nome}`;


          p.appendChild(b);
          let pScuderia=document.createElement("p");
          pScuderia.textContent = `${scuderia}`;
          divDettagliRight.appendChild(pScuderia)
          let pMotore=document.createElement("p");

          pMotore.textContent="Motore: ";
          divDettagliRight.appendChild(pMotore)
          b=document.createElement("b");
          b.textContent = team.motore;
          pMotore.appendChild(b);
          let pPneumatici=document.createElement("p");
          pPneumatici.textContent="Pneumatici: ";
          divDettagliRight.appendChild(pPneumatici)
          b=document.createElement("b");
          b.textContent = team.pneumatici;
          pPneumatici.appendChild(b);
          
          let pNascita=document.createElement("p");
          pNascita.textContent="Data di nascita: ";
          divDettagliRight.appendChild(pNascita)
          b=document.createElement("b");
          b.textContent = pilota.data_di_nascita;
          pNascita.appendChild(b);
        });
        tdNome.appendChild(span);
        tr.appendChild(tdNome);

        let tdNazione = document.createElement("td");
        tdNazione.textContent = pilota.nazione;
        tr.appendChild(tdNazione);

        let tdScuderia = document.createElement("td");
        tdScuderia.textContent = scuderia;
        tr.appendChild(tdScuderia);

        table.appendChild(tr);
      }
    }
  }

};
