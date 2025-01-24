"use strict"

$(document).ready(function () {
	
	let _lstMarche = document.getElementById("lstMarche");
	let _lstModelli = document.getElementById("lstModelli");
	let _table= document.getElementsByTagName("table")[0];
	let _dettagli=document.querySelector(".details")
	let codModello
	let nomeModelloSelected=""
	_dettagli.style.display="none";
	_table.style.display="none";
	_lstModelli.disabled="disabled";

	let jsonMarche= getMarche()

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
		return request
	}
    _lstMarche.addEventListener("change",function () {
		_lstModelli.disabled = false
		codModello=this.value
		_table.style.display="none"
		document.querySelector(".row:nth-of-type(3) > div:nth-of-type(2)").style.display="none"
		caricaModelli()
	})
	function caricaModelli(){
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
	}
	_lstModelli.addEventListener("change",function () {
		_table.style.display="block";
		let tbody=document.querySelector("tbody")
		_table.appendChild(tbody)
		
		tbody.innerHTML=""
		let modelloId=this.value
		console.log(modelloId)
		caircaAuto(modelloId)
		function caircaAuto(modelloId) {
			let currentModel;
			let nomeModello =getModello()
			function getModello() {
				let requestModello=inviaRichiesta("GET","/modelli",{"id":modelloId})
			requestModello.catch(errore)
			requestModello.then(function (response){
				currentModel=response.data
				console.log(currentModel)
				nomeModello=currentModel[0].nome
			})
			}
			
			
			let request=inviaRichiesta("GET","/automobili",{"codModello":modelloId})
			request.catch(errore)
			request.then(function (response) {
				let automobili=response.data
				console.log(automobili)
				
				for (const automobile of automobili) {
					let tr=document.createElement("tr")
					console.log(nomeModello)
					let td=document.createElement("td")
					td.innerHTML=nomeModello
					tr.appendChild(td)
	
					td=document.createElement("td")
					if(currentModel[0].alimentazione){
						td.textContent=currentModel[0].alimentazione
					}
						
					tr.appendChild(td)
	
					td=document.createElement("td")
					td.textContent=automobile.colore
					tr.appendChild(td)
	
					td=document.createElement("td")
					td.textContent=automobile.anno
					tr.appendChild(td)
	
					td=document.createElement("td")
					let img=document.createElement("img")
					img.src=`./img/${automobile.img}`
					img.style.height="65px"
	
					
					td.appendChild(img)
					tr.appendChild(td)
	
					td=document.createElement("td")
					let btnDettagli=document.createElement("button")
					btnDettagli.textContent="Dettagli"
					btnDettagli.classList.add("btn","btn-success")
					btnDettagli.addEventListener("click", function() {
						document.querySelector(".row:nth-of-type(3) > div:nth-of-type(2)").style.display="block"
						let idMarca =automobile.id;
						let nome = nomeModello;
						let alimentazione = currentModel[0].alimentazione;
						let cilindrata = currentModel[0].cilindrata;
						let targa = automobile.targa;
						let colore = automobile.colore;
						let anno = automobile.anno;
						let km = automobile.km;
						console.log(idMarca, nome, alimentazione, cilindrata, targa, colore, anno, km);
						$("#txtId").val(idMarca);
						$("#txtNome").val(nome);
						$("#txtAlimentazione").val(alimentazione);
						$("#txtCilindrata").val(cilindrata);
						$("#txtTarga").val(targa);
						$("#txtColore").val(colore);
						$("#txtAnno").val(anno);
						$("#txtKm").val(km);
					});
					td.appendChild(btnDettagli)
					tr.appendChild(td)
					td=document.createElement("td")
					let btnElimina=document.createElement("button")
					btnElimina.textContent="Elimina"
					btnElimina.classList.add("btn","btn-secondary")
					btnElimina.addEventListener("click", function() {
					
						let requestElimina=inviaRichiesta("DELETE","/automobili/"+automobile.id)
						requestElimina.catch(errore)
						requestElimina.then(function (response){
							console.log(response)
				
						})

					})
					td.appendChild(btnElimina)
					tr.appendChild(td)
					tbody.appendChild(tr)
				}
			
			})
		}
	})
	let btnAggiorna=document.getElementById("btnAggiorna")
	btnAggiorna.addEventListener("click", function() {
		let txtPrezzo=document.getElementById("txtPrezzo")
		let txtId=document.getElementById("txtId")
		if(txtPrezzo.value==""){
			let id=txtId.value
			let prezzo=parseInt( txtPrezzo.value)			
			// let requestId=inviaRichiesta("PATCH","/automobili/"+id,{"prezzo":prezzo})
			let requestId=inviaRichiesta("PATCH","/automobili/"+id,{prezzo})
			requestId.catch(errore)

				
		}
	})
		
});