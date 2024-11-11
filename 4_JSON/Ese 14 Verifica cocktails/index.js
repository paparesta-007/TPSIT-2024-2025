"use strict";

let headers = ["", "id", "name", "alcohlic", "main ingredient", ""];
let headersWidth = [40, 40, 60, 70, 70, 40];

window.onload = function () {
  const optAlcolico = document.getElementById("optAlcoholic");
  const optNonAlcolico = document.getElementById("optNonAlcoholic");
  const optTutti = document.getElementById("optTutti");
  const lstIngredienti = document.getElementById("lstIngredienti");
  const table = document.getElementsByTagName("table")[0];
  const button=document.getElementsByTagName("button")[0];
  button.addEventListener("click",function () {
	window.location.href="inserisci.html";
  })
  const details = document.getElementById("dettagli");
  let tbody = document.createElement("tbody");
  table.appendChild(tbody);
  details.style.display = "none";
  let genere="Tutti";
  let selectedIngrediente="";
  let optVet=[optAlcolico,optNonAlcolico,optTutti];
  for(let opt of optVet){
	opt.addEventListener("change",function(){
		if (this.id == "optAlcoholic") {
			genere = "Alcoholic";
		  } else if (this.id == "optNonAlcoholic") {
			genere = "Non alcoholic";
		  } else {
			genere = "Tutti";
		  }
			console.log(genere);
			loadTable();
	})
	
  }
  let json = localStorage.getItem("./DB/cocktails_json");
  if (!json) {
    json = cocktails;
  }
  let objCocktails = JSON.parse(json);
  console.log(objCocktails);
  let jsonIngriedient = localStorage.getItem("./DB/ingredients_json");
  if (!jsonIngriedient) {
    jsonIngriedient = ingredients;
  }
  let objIngredients = JSON.parse(jsonIngriedient);
  console.log(objIngredients);
  caricaIngredienti();
  function caricaIngredienti() {
	lstIngredienti.innerHTML = "";
	let vet=[];

	for(const key of objIngredients.ingredients){
		vet.push(key.strIngredient1);
	}
	
	console.log(vet)
	vet.sort()
	let opt = document.createElement('option');
    opt.value = '';
    opt.textContent = 'Tutti';
    lstIngredienti.appendChild(opt);

	for(const ingredientInVet of vet){
		opt=document.createElement('option');
		opt.value=ingredientInVet;
		opt.textContent=ingredientInVet
		lstIngredienti.appendChild(opt);
	}
	lstIngredienti.addEventListener("change",function(){
        selectedIngrediente=this.value;
        console.log(selectedIngrediente);
        loadTable();
    })
  }
  createHeaders();

  function createHeaders() {
    const thead = document.createElement("thead");
    table.appendChild(thead);
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

  loadTable();

  function loadTable() {
    tbody.innerHTML = "";
    let selectedDrinks = objCocktails.drinks;

    for (const drink of selectedDrinks) {
	 if((genere === "Tutti" || drink.strAlcoholic === genere)
		&&(selectedIngrediente==drink.strIngredient1 || selectedIngrediente==""))
	 {
      const tr = document.createElement("tr");
      tbody.appendChild(tr);

      let td = document.createElement("td");
      tr.appendChild(td);

      let img = document.createElement("img");
      img.src = drink.strDrinkThumb;
      img.style.width = "40px";
      td.appendChild(img);

      td = document.createElement("td");
      tr.appendChild(td);
      td.textContent = drink.idDrink;

      td = document.createElement("td");
      td.textContent = drink.strDrink;
      tr.appendChild(td);

      td = document.createElement("td");
      td.textContent = drink.strAlcoholic;
      tr.appendChild(td);

      td = document.createElement("td");
      td.textContent = drink.strIngredient1;
      tr.appendChild(td);

      td = document.createElement("td");
      let collegamento = document.createElement("a");
      collegamento.href = "#";
      collegamento.textContent = "Dettagli";
      tr.appendChild(td);
      collegamento.addEventListener("click", function () {
        details.innerHTML = "";
        details.style.display = "block";
        const h3 = document.createElement("h3");
        h3.textContent = drink.strDrink;
        details.appendChild(h3);

        let p = document.createElement("p");
        p.innerHTML = "<b>Ingredienti: </b>";
        details.appendChild(p);
        p.innerHTML += ``;
        for (let i = 1; i <= 5; i++) {
          if (drink["strIngredient" + i]) {
            p.innerHTML += drink["strIngredient" + i] + " - ";
          }
        }
        let img = document.createElement("img");
        img.src = drink.strDrinkThumb;
        img.style.width = "140px";
        details.appendChild(img);
      });
      td.appendChild(collegamento);
    }
	}
  }
};
