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

	const primo=btns[0]
	const indietro = btns[1]
	const avanti = btns[2]
	const ultimo = btns[3];
	btns[0].disabled=true;
	btns[1].disabled=true;
	
	let nome, city, state, nationality;

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

	const malePersons = xmlRoot.querySelectorAll("male > person");
	const femalePersons = xmlRoot.querySelectorAll("female > person");

	loadMale();

	function loadMale() {
		table.innerHTML = ""; // Pulizia della tabella

		const start = currentPage * recordsPerPage; // Calcola l'indice di partenza
		const end = start + recordsPerPage; // Calcola l'indice finale

		for (const maschi of malePersons) {
			// Usa un ciclo for...of per iterare solo sui record della pagina attuale
			if (Array.from(malePersons).indexOf(maschi) >= start && Array.from(malePersons).indexOf(maschi) < end) {
				readMale(maschi);

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
				tr.appendChild(td);

				td = document.createElement("td");
				td.style.backgroundImage = `url(./img/delete.png)`;
				td.style.backgroundSize = "cover";
				td.style.padding = "5px";
				td.style.width = "20px";
				td.style.height = "20px";
				td.style.backgroundRepeat = "no-repeat";
				td.style.backgroundOrigin = "content-box";
				tr.appendChild(td);
			}
		}

		nPag.textContent = `${currentPage + 1}/${Math.ceil(malePersons.length / recordsPerPage)}`; 
	}

	function readMale(maschi) {
		nome = "";
		city = "";
		state = "";
		nationality = "";

		const nameNode = maschi.querySelector("name");
		if (nameNode) {
			const firstNameNode = nameNode.querySelector("first");
			const lastNameNode = nameNode.querySelector("last");

			if (firstNameNode && lastNameNode) {
				nome = firstNameNode.textContent + " " + lastNameNode.textContent;
			}
		}

		const locationNode = maschi.querySelector("location");
		if (locationNode) {
			const cityNode = locationNode.querySelector("city");
			const stateNode = locationNode.querySelector("state");

			if (cityNode) city = cityNode.textContent;
			if (stateNode) state = stateNode.textContent;
		}

		const natNode = maschi.querySelector("nat");
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
			avanti.disabled=false;
			ultimo.disabled=false;
		}
		avanti.disabled=false;
	};

	avanti.onclick = function () { // Avanti
		if ((currentPage + 1) * recordsPerPage < malePersons.length) {
			currentPage++;
			primo.disabled=false;
			indietro.disabled=false;
			
		}
		if(currentPage==(Math.ceil(malePersons.length / recordsPerPage)-1)) {
			ultimo.disabled=true;
			avanti.disabled=true;
		}
		loadMale();
	};

	ultimo.onclick = function () { // Ultimo
		currentPage = Math.floor(malePersons.length / recordsPerPage);
		primo.disabled=false;
			indietro.disabled=false;
		if(currentPage==(Math.ceil(malePersons.length / recordsPerPage)-1)) {
			ultimo.disabled=true;
			avanti.disabled=true;
		}
		loadMale();
	};
};
