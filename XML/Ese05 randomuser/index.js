"use strict"

const headers = ["Name", "City", "State", "Nat", "", ""]
const headersWidth = ["25%", "25%", "25%", "10%", "7.5%", "7.5%"]
let currentPage = 0;
const recordsPerPage = 6; // Numero di record per pagina

window.onload = function () {
	const opts = document.querySelectorAll("#optWrapper input")
	const table = document.querySelector("table")
	const btns = document.querySelectorAll("#buttons input")
	const details = document.getElementById("details")
	const nPag = document.getElementById("nPagina");
	let gender="male";

	const primo=btns[0]
	const indietro = btns[1]
	const avanti = btns[2]
	const ultimo = btns[3];
	btns[0].disabled=true;
	btns[1].disabled=true;
	
	let nome, city, state, nationality;
	for (const opt of opts) {
		opt.addEventListener("change",function(){
			gender=this.value;
            loadMale(gender);
		})
	}

	let xml = localStorage.getItem("people_xml");
	if (!xml) {
		xml = people; // Se non trovato in localStorage, usa la variabile people
		console.log("Successfully loaded");
	} else {
		console.log("Error getting people");
	}

	const parser = new DOMParser();
	const xmlDOC = parser.parseFromString(xml, "text/xml");
	const xmlRoot = xmlDOC.documentElement;

	let root;
	loadMale(gender);
     
	function loadMale(gender) {
		table.innerHTML = ""; // Pulizia della tabella
		for(const header of headers){//caricamento header
			const td=document.createElement("td");
			td.style.width=headersWidth[headers.indexOf(header)];
			td.style.fontWeight="bold";
			td.innerHTML += header;
			table.appendChild(td);
		}

		const start = currentPage * recordsPerPage; // Calcola l'indice di partenza
		const end = start + recordsPerPage; // Calcola l'indice finale
		const sesso = (gender == "male") ? "male" : "female";

		root=xmlRoot.querySelectorAll(sesso+"> person");
		let id=0;
		for (const persona of root) {
			// Usa un ciclo for...of per iterare solo sui record della pagina attuale
			if (Array.from(root).indexOf(persona) >= start && Array.from(root).indexOf(persona) < end) {
				readPerson(persona);
				id++;
				const tr = document.createElement("tr");
				table.appendChild(tr);

				let td = document.createElement("td");
				tr.appendChild(td);
				td.textContent = nome;

				td = document.createElement("td");
				tr.appendChild(td);
				td.textContent = city;

				td = document.createElement("td");
				tr.appendChild(td);
				td.textContent = state;

				td = document.createElement("td");
				tr.appendChild(td);
				td.textContent = nationality;

				td = document.createElement("td");
				td.style.backgroundImage = `url(./img/lente.jpg)`;
				td.style.backgroundSize = "cover";
				td.style.padding = "5px";
				td.style.width = "20px";
				td.style.height = "20px";
				td.style.backgroundRepeat = "no-repeat";
				td.style.backgroundOrigin = "content-box";
				td.addEventListener("click", function () {
					details.innerHTML = "";  
					let emailNode = persona.querySelector("email"); 
					let email = document.createElement("p");
				
					if (emailNode) {
						email.textContent = emailNode.textContent;
						// console.log(emailNode.textContent);
					} else {
						console.log("Errore nel recupero dell'email");
					}
					details.appendChild(email);

					let imageNode=persona.querySelector("picture > large");
					let img=document.createElement("img");
					if(imageNode){
						
					img.src=imageNode.textContent;
					}
					
					details.appendChild(img)


					let numberNode = persona.querySelector("phone");
                	let number = document.createElement("p");
					if(numberNode){
						number.textContent = numberNode.textContent;
					}
					details.appendChild(number);
                

				});
				
				tr.appendChild(td);

				td = document.createElement("td");
				td.style.backgroundImage = `url(./img/delete.png)`;
				td.style.backgroundSize = "cover";
				td.style.padding = "5px";
				td.style.width = "20px";
				td.style.height = "20px";
				td.addEventListener("click", function(){
					
                    
				})
				td.style.backgroundRepeat = "no-repeat";
				td.style.backgroundOrigin = "content-box";
				tr.appendChild(td);
			}
		}

		nPag.textContent = `${currentPage + 1}/${Math.ceil(root.length / recordsPerPage)}`; 
	}

	function readPerson(persona) {
		nome = "";
		city = "";
		state = "";
		nationality = "";

		const nameNode = persona.querySelector("name");
		if (nameNode) {
			const firstNameNode = nameNode.querySelector("first");
			const lastNameNode = nameNode.querySelector("last");

			if (firstNameNode && lastNameNode) {
				nome = firstNameNode.textContent + " " + lastNameNode.textContent;
			}
		}

		const locationNode = persona.querySelector("location");
		if (locationNode) {
			const cityNode = locationNode.querySelector("city");
			const stateNode = locationNode.querySelector("state");

			if (cityNode) city = cityNode.textContent;
			if (stateNode) state = stateNode.textContent;
		}

		const natNode = persona.querySelector("nat");
		if (natNode) {
			nationality = natNode.textContent;
		}
	}

	// Gestione dei pulsanti di navigazione
	primo.onclick = function () { // Primo
		if(currentPage==1) {
			
			primo.disabled=true;
			
		}
		ultimo.disabled=false;
		avanti.disabled=false;
		indietro.disabled=true;
		currentPage = 0;
		loadMale();
		btns[0].disabled=true;
	};

	indietro.onclick = function () { // Indietro
		if (currentPage > 0) {
			currentPage--;
			loadMale();
		}
		if(currentPage==0) {
			indietro.disabled=true;
			primo.disabled=true;
			
			
		}
		ultimo.disabled=false;
		avanti.disabled=false;
	};

	avanti.onclick = function () { // Avanti
		if ((currentPage + 1) * recordsPerPage < root.length) {
			currentPage++;
			primo.disabled=false;
			indietro.disabled=false;
			
		}
		if(currentPage==(Math.ceil(root.length / recordsPerPage)-1)) {
			ultimo.disabled=true;
			avanti.disabled=true;
		}
		loadMale();
	};

	ultimo.onclick = function () { // Ultimo
		currentPage = Math.ceil(root.length / recordsPerPage) - 1; // Adjust to zero-based index
		primo.disabled = false;
		indietro.disabled = false;
		if (currentPage === Math.ceil(root.length / recordsPerPage) - 1) {
			ultimo.disabled = true;
			avanti.disabled = true;
		}
		loadMale(gender);
	};
	
};
