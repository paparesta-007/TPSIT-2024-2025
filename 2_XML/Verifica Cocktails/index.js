"use strict";

let headers = ["", "id", "name", "alcoholic", "main ingredient", ""];
let headersWidth = [40, 40, 60, 70, 70, 40];

window.onload = function () {
  const optAlcolico = document.getElementById("optAlcoholic");
  const optNonAlcolico = document.getElementById("optNonAlcoholic");
  const optTutti = document.getElementById("optTutti");
  const lstIngredienti = document.getElementById("lstIngredienti");
  const table = document.getElementsByTagName("table")[0];
  const details = document.getElementById("dettagli");
  const btnAdd=document.getElementsByTagName("button")[0];


  details.style.display = "none";
  let type = "Tutti"; //Default
  let Ingredient = "";
  let opts = [optAlcolico, optNonAlcolico, optTutti];

  btnAdd.addEventListener("click", function () {
		window.location.href="inserisci.html";
  })
  let optiIngredient;
  for (const opt of opts) {
    opt.addEventListener("change", function () {
      if (this.id === "optTutti") {
        type = "Tutti";
      } else if (this.id === "optAlcoholic") {
        type = "Alcoholic";
      } else {
        type = "Non alcoholic";
      }

      console.log("Tipo: ", type);
      loadData();
    });
  }

  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");
  table.appendChild(thead);
  table.appendChild(tbody);

  let xml = localStorage.getItem("cocktails_xml");
  if (!xml) {
    xml = cocktails;
  }
  const parser = new DOMParser();
  const xmlDOC = parser.parseFromString(xml, "text/xml");
  const xmlRoot = xmlDOC.firstElementChild;

  let drinks = xmlRoot.querySelectorAll("drinks");

  loadData();

  function createHeaders() {
    thead.innerHTML = "";
    let tr = document.createElement("tr");
    thead.appendChild(tr);
    for (const header of headers) {
      const th = document.createElement("th");
      th.style.width = headersWidth[headers.indexOf(header)] + "px";
      th.style.textAlign = "left";
      th.innerHTML = header;
      tr.appendChild(th);
    }
  }

  function loadData() {
    tbody.innerHTML = "";
    
    createHeaders();
    createTable();
    caricaIngredienti();
  }

  
  function caricaIngredienti() {
    if (!lstIngredienti.childElementCount > 0) {
      
		lstIngredienti.innerHTML = "";
		let vet = [""];
		for (const drink of drinks) {
		  let ingrediente = drink.querySelector("strIngredient1").textContent;
		  if (!vet.includes(ingrediente)) {
			vet.push(ingrediente);
		  }
		}
	
		for (const ingrediente of vet) {
		  optiIngredient = document.createElement("option");
		  optiIngredient.textContent = ingrediente;
		  optiIngredient.value = ingrediente;
		  lstIngredienti.appendChild(optiIngredient);
		}
	
		lstIngredienti.addEventListener("change", function () {
		  Ingredient = this.value;
		  console.log("Ingrediente: ", Ingredient);
		  loadData();
		});
    }

    
  }

  function createTable() {
    for (const drink of drinks) {
      let drinkType = drink.querySelector("strAlcoholic").textContent;
      let strIngredient1 = drink.querySelector("strIngredient1").textContent;

      if ((type == "Tutti" || drinkType == type) && (Ingredient == "" || strIngredient1 == Ingredient)) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);

        let td = document.createElement("td");
        tr.appendChild(td);
        let imgSrc = drink.querySelector("strDrinkThumb").textContent;
        let img = document.createElement("img");
        img.src = imgSrc;
        img.style.width = "40px";
        td.appendChild(img);

        td = document.createElement("td");
        tr.appendChild(td);
        td.textContent = drink.querySelector("idDrink").textContent;

        td = document.createElement("td");
        tr.appendChild(td);
        td.textContent = drink.querySelector("strDrink").textContent;

        td = document.createElement("td");
        tr.appendChild(td);
        td.textContent = drink.querySelector("strAlcoholic").textContent;

        td = document.createElement("td");
        tr.appendChild(td);
        td.textContent = drink.querySelector("strIngredient1").textContent;

        td = document.createElement("td");
        let collegamento = document.createElement("a");
        collegamento.href = "#";
        collegamento.textContent = "Dettagli";
        collegamento.addEventListener("click", function () {
          details.innerHTML = "";
          details.style.display = "block";

          let h3 = document.createElement("h3");
          h3.textContent = drink.querySelector("strDrink").textContent;
          details.appendChild(h3);

          let p = document.createElement("p");
          p.innerHTML = "<b>Ingredienti: </b>";
          details.appendChild(p);

          for (let i = 1; i <= 5; i++) {
            let ingredient = drink.querySelector("strIngredient" + i)?.textContent;
            if (ingredient && ingredient !== "") {
              p.innerHTML += ingredient + " - ";
            } else {
              break;
            }
          }

          let img = document.createElement("img");
          img.src = drink.querySelector("strDrinkThumb").textContent;
          img.style.width = "140px";
          details.appendChild(img);
        });

        td.appendChild(collegamento);
        tr.appendChild(td);
      }
    }
  }
};
