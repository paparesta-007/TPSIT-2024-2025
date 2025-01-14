"use strict"

$(document).ready(function () {
	
	let _lstMarche = document.getElementById("lstMarche");
	let _lstModelli = document.getElementById("lstModelli");
	let _table= document.getElementsByTagName("table")[0];
	let _dettagli=document.querySelector(".details")

	_dettagli.style.display="none";
	_table.style.display="none";
	

	getMarche()

	function getMarche() {
		let request=inviaRichiesta("GET","/marche")
		request.catch(errore);
		request.then(function (response) {
			let marche = response.data
			console.log(marche)
			
			for(const marca of marche) {
				let opt=document.createElement("option")
				opt.value=marca.id
				opt.text=marca.nome
				_lstMarche.appendChild(opt)
			}
			_lstMarche.selectedIndex=-1
		})
	}
    _lstMarche.addEventListener("change",function () {
		let codModello=this.value
		let request=inviaRichiesta("GET","/modelli",{"codMarca":codModello})
		request.catch(errore);
		request.then(function (response) {
			let modelli=response.data;
			console.log(modelli)
			_lstModelli.innerHTML=""
			for (const modello of modelli) {
				let opt=document.createElement("option")
				opt.value=modello.id
				opt.textContent=modello.nome+" "+modello.alimentazione
				_lstModelli.appendChild(opt)
			}
			_lstModelli.selectedIndex=-1
		})
	})
	_lstModelli.addEventListener("change",function () {
		let modelloId=this.value
		let request=inviaRichiesta("GET","/automobili",{"codModello":modelloId})
		request.catch(errore)
		request.then(function (response) {
			let automobili=response.data
			console.log(automobili)
		})
	})

		
});


