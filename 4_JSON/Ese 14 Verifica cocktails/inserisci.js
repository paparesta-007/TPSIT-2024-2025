"use strict";

window.onload = function () {
  const txtId = document.getElementById("txtId");
  const txtName = document.getElementById("txtName");

  const lstIngredienti = document.getElementsByTagName("select")[0];

  const btnSalva = document.getElementById("btnSalva");
  const btnAnnulla = document.getElementById("btnAnnulla");
  const optAlcoholic = document.getElementById("optAlcoholic");
  const optNonAlcoholic = document.getElementById("optNotAlcoholic");

  let optVet = [optAlcoholic, optNonAlcoholic];
  let selectedIngrediente;
  for (let opt of optVet) {
    opt.addEventListener("click", function () {
      console.log(this.value);
    });
  }
  let vetId = [];
  let json = localStorage.getItem("./DB/cocktails_json");
  if (!json) {
    json = cocktails;
  }
  let objCocktails = JSON.parse(json);
  let jsonIngriedient = localStorage.getItem("./DB/ingredients_json");
  if (!jsonIngriedient) {
    jsonIngriedient = ingredients;
  }
  let objIngredients = JSON.parse(jsonIngriedient);
  console.log(objIngredients);
  for (const drink of objCocktails.drinks) {
    vetId.push(drink.idDrink);
  }
  console.log(vetId);
  console.log(objCocktails);
  btnAnnulla.addEventListener("click", function () {
    window.location.href = "./index.html";
  });

  btnSalva.addEventListener("click", function () {
    if (vetId.includes(txtId.value)) {
      alert("Id già utilizzato");
      txtId.focus();
      return;
    }
    const nuovoDrink = {
      idDrink: txtId.value,
      strDrink: txtName.value,
      strAlcoholic: selectedIngrediente,
      ingredients: selectedIngrediente,
      strDrinkThumb: "./cocktail.jpg",
    };
    objCocktails.drinks.push(nuovoDrink);

    window.location.href = "./index.html";
    alert("Drink aggiunto");
    localStorage.setItem("./DB/cocktails_json", JSON.stringify(objCocktails));
  });

  caricaIngredienti();
  function caricaIngredienti() {
    let vetIngredient = [];

    lstIngredienti.innerHTML = "";

    for (let ingrediente of objIngredients.ingredients) {
      vetIngredient.push(ingrediente.strIngredient1);
    }
    let opt = document.createElement("option");
    vetIngredient.sort();

    for (const ingredienteInVet of vetIngredient) {
      opt = document.createElement("option");
      opt.value = ingredienteInVet;
      opt.textContent = ingredienteInVet;
      lstIngredienti.appendChild(opt);
    }
    // console.log()
    lstIngredienti.selectedIndex = -1;
    lstIngredienti.addEventListener("change", function () {
      selectedIngrediente = this.value;
      console.log(selectedIngrediente);
    });
  }
};
