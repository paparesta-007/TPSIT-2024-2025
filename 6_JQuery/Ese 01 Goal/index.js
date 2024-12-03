"use strict"
window.onload = function()
{	
	let calciatore = $("#calciatore");
	let palla = $("#palla");
	
	let btnEntra=$("#btnEntra")
	let btnEsci = $("#btnEsci")
	let btnVisualizzaPalla = $("#btnVisualizzaPalla")
	let btnNascondiPalla = $("#btnNascondiPalla")
	let btnTira = $("#btnTira")

	calciatore.hide();
	palla.hide();
	
    btnEsci.hide();
	btnNascondiPalla.hide();
	btnTira.hide();
	
	btnEntra.on("click", function(){
		btnEntra.hide();
		calciatore.show(2000,function(){
			btnEsci.show();
		});
       
	})
	
	
	
};




