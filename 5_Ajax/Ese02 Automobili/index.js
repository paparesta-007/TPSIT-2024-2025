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
		codModello=this.value
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
		_table.style.display="block";
		let tbody=document.querySelector("tbody")
		_table.appendChild(tbody)
		
		tbody.innerHTML=""
		let modelloId=this.value
		console.log(modelloId)
		let currentModel;
		let nomeModello
		let requestModello=inviaRichiesta("GET","/modelli",{"id":modelloId})
		requestModello.catch(errore)
		requestModello.then(function (response){
			currentModel=response.data
			console.log(currentModel)
			nomeModello=currentModel[0].nome
		})
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
				td.textContent=currentModel[0].alimentazione	
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
				img.style.height="80px"

				
				td.appendChild(img)
				tr.appendChild(td)

				td=document.createElement("td")
				let btnDettagli=document.createElement("button")
				btnDettagli.textContent="Dettagli"
				btnDettagli.classList.add("btn")
				btnDettagli.style.backgroundColor="rgb(74, 180, 74)"
				btnDettagli.style.color="white"
				btnDettagli.addEventListener("click",function() {
					_dettagli.style.display="block";
					let idMarca=_lstMarche.selectedIndex+1;
					let idModello=this.parentElement.parentElement.querySelector("td:first-child").textContent;
					
				})
				td.appendChild(btnDettagli)
				tr.appendChild(td)


				td=document.createElement("td")
				let btnElimina=document.createElement("button")
				btnElimina.textContent="Elimina"
				btnElimina.classList.add("btn")
				btnElimina.style.backgroundColor="rgb(255, 59, 48)"
				btnElimina.style.color="white"
				td.appendChild(btnElimina)
				tr.appendChild(td)
				tbody.appendChild(tr)



			}
		
		})
	})

		
});