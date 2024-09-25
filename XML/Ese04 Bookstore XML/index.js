'use strict';

window.onload = function () {
	let views = [];
	const listView = document.getElementById("list-view");
	const divNbooks = document.querySelector(".nBooks");
	const tBody = document.getElementById("tabLibri");
	views.push(listView);

	const detailsView = document.getElementById("details-view");
	detailsView.style.display = "none";
	const details = detailsView.querySelector(".details");
	const spanCount = document.querySelector(".buttons span");
	views.push(detailsView)

	const addView = document.getElementById("add-view");
	addView.style.display = "none";
	const newDetail = addView.querySelector(".details");
	views.push(addView);

	let xml = localStorage.getItem("bookstore_xml");
	if (!xml) {
		xml = bookstore;
	}
	const parser = new DOMParser();
	let xmlDOC = parser.parseFromString(xml, "text/xml");
	const xmlRoot = xmlDOC.firstElementChild;

	let currentBookIndex=0;
	let id 
	let title 
	let category 
	let year 
	let price 
	let lang 
	let authors


	const headerBtns = document.getElementsByClassName("headerBtn");
	Array.from(headerBtns).forEach(function (headerBtn,i) {
		headerBtn.addEventListener("click", function () {

			Array.from(headerBtns).forEach(function (btn) {
				btn.classList.remove("active");
			});

			this.classList.add("active");

			//gestione delle views
			
			if(i!=3){
				for (const view of views) {
					view.style.display="none"
				}
				views[i].style.display="block";
				if(i==0){
					loadBooks();
				} else if(i==1){
					loadDetails();
				}
				else{
					addNewBook();
				}
			}

			// views[i].style.display="block";	
		});
	});
	function loadDetails(){
		details.innerHTML="";
		const book=xmlRoot.children[currentBookIndex];
	}
	function addNewBook(){
		
	}

	loadBooks();

	function loadBooks() {
		tBody.innerHTML="";
		divNbooks.textContent = "Numeri di libri: " + xmlRoot.children.length; // solo figli diretti

		for (const book of xmlRoot.children) {
			 id = "";
			 title = "";
			 category = "";
			 year = "";
			 price = "";
			 lang = "";
			 authors = "";

			// Supponiamo che id sia sempre il 1° campo
			const idNode = book.querySelector("id");
			if (idNode) {
				id = idNode.textContent.trim(); // Usa trim() per rimuovere spazi bianchi
			}

			// Supponiamo che title sia sempre il 2° campo
			const titleNode = book.querySelector("title");
			if (titleNode) {
				title = titleNode.textContent;
			}

			// Assicurati di selezionare il nodo giusto per l'anno
			const yearNode = book.querySelector("year");
			if (yearNode) {
				year = yearNode.textContent; // Cambiato da innerHTML a textContent
			}

			const priceNode = book.querySelector("price");
			if (priceNode) {
				price = priceNode.textContent; // Cambiato da innerHTML a textContent
			}

			if (titleNode && titleNode.hasAttribute("lang")) {
				lang = titleNode.getAttribute("lang");
			}

			const authorsNodes = book.querySelectorAll("author");
			for (const authorNode of authorsNodes) {
				authors += authorNode.textContent + " - "; // Aggiunto un separatore
			}
			if (authors !== "") {
				authors = authors.substring(0, authors.length - 3); // Rimuovi l'ultimo " - "
			}

			// FASE 2 : VISUALIZZAZIONE
			const tr = document.createElement("tr");
			tBody.appendChild(tr);

			let td = document.createElement("td");
			tr.appendChild(td);
			td.textContent = id;

			td = document.createElement("td");
			tr.appendChild(td);
			td.textContent = title;

			td = document.createElement("td");
			tr.appendChild(td);
			if (book.hasAttribute("category")) {
				category = book.getAttribute("category");
			}
			td.textContent = category;

			td = document.createElement("td");
			tr.appendChild(td);
			td.textContent = lang;

			td = document.createElement("td");
			tr.appendChild(td);
			td.textContent = authors;

			td = document.createElement("td");
			tr.appendChild(td);
			td.textContent = year;

			td = document.createElement("td");
			tr.appendChild(td);
			td.textContent = price;

			const btnDelete = document.createElement("button");
			btnDelete.textContent = "Delete";
			tr.appendChild(btnDelete);
		}
	}
};
