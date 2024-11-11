"use strict";

window.onload = function () {

    let _txtId=document.getElementById("txtId");
    let _txtName=document.getElementById("txtName");
    let _lstIngredients=document.getElementById("lstIngredients");
    let _optAlcoholic=document.getElementById("optAlcoholic");
    let _optNonAlcoholic=document.getElementById("optNotAlcoholic");
    let lstIngredienti=document.getElementById("lstIngredients");
    let btnSalva=document.getElementById("btnSalva");
    let btnAnnulla=document.getElementById("btnAnnulla");
    
 
  let xml = localStorage.getItem("cocktails_xml");
  if (!xml) {
    xml = cocktails;
  }
  
  const parser = new DOMParser();
  const xmlDOC = parser.parseFromString(xml, "text/xml");
  const xmlRoot = xmlDOC.firstElementChild;
  let drinks = xmlRoot.querySelectorAll("drinks");
  let vetId=[];
  let alcoholic;
  let vetOptAlcoholic=[_optAlcoholic,_optNonAlcoholic];
  for(const opt of vetOptAlcoholic){
    opt.checked=false;
    opt.addEventListener("click", function () {
      alcoholic = this.value;
      console.log(alcoholic)
    });
  }
  let optiIngredient;
  let Ingredient;
  caricaIngredienti()
  caricaId();
  
  function caricaId() {
    for(const drink of drinks){
        vetId.push(drink.querySelector("idDrink").textContent);
  
    }
    console.log(vetId);
  }

  function caricaIngredienti() {
    lstIngredienti.innerHTML = "";
    let vet = [""];
		for (const drink of drinks) {
		  let ingrediente = drink.querySelector("strIngredient1").textContent;
		  if (!vet.includes(ingrediente)) {
			vet.push(ingrediente);
		  }
		}
    vet.sort();  //ordino per nome ingredienti in ordine alfabetico
    console.log(vet);
    for (const ingrediente of vet) {
        optiIngredient = document.createElement("option");
        optiIngredient.textContent = ingrediente;
        optiIngredient.value = ingrediente;
        lstIngredienti.appendChild(optiIngredient);
      }
  
      lstIngredienti.addEventListener("change", function () {
        Ingredient = this.value;
        console.log("Ingrediente: ", Ingredient);
        
      });
   }
  btnSalva.addEventListener("click", function () {
    if(vetId.includes(_txtId.value)){
        alert("Id già utilizzato");
        return;
    }


    let serializer = new XMLSerializer();
    let xmlStr = serializer.serializeToString(xmlDOC);
    window.location.href="index.html";

  })
 
  btnAnnulla.addEventListener("click", function () {
    window.location.href="index.html";
  })
}