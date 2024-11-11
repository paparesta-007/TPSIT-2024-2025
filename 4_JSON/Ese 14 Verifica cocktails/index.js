"use strict";

let headers=["", "id", "name", "alcohlic", "main ingredient", ""]
let headersWidth=[40, 40, 60, 70, 70, 40]


window.onload=function()
{
	const optAlcolico = document.getElementById("optAlcoholic")
	const optNonAlcolico = document.getElementById("optNonAlcoholic")
	const optTutti = document.getElementById("optTutti")
	const lstIngredienti=document.getElementById("lstIngredienti")
	const table = document.getElementsByTagName("table")[0];
	const details=document.getElementById("dettagli")
	let tbody;

	let json = localStorage.getItem("./DB/cocktails_json");
	if(!json){
		json=cocktails;
	}
	let objCocktails=JSON.parse(json);
	console.log(objCocktails);
	
}

