"use strict";

window.onload = function () {
  let currentBookIndex = 0;

  let id, category, title, year, price, lang, authors;
    localStorage.clear()
  let views = [];
  const listView = document.getElementById("list-view");
  const divNbooks = document.querySelector(".nBooks");
  const tBody = document.getElementById("tabLibri");
  views.push(listView);

  const detailsView = document.getElementById("details-view");
  detailsView.style.display = "none";
  const details = detailsView.querySelector(".details");
  const spanCount = document.querySelector(".buttons span");
  views.push(detailsView);

  const addView = document.getElementById("add-view");
  addView.style.display = "none";
  const newDetail = addView.querySelector(".details");
  const newDetailBtn = addView.querySelector(".buttons");
  views.push(addView);

  const viewBtn=document.getElementById("viewBtn");
  let headerBtns = document.getElementsByClassName("headerBtn");
  headerBtns[0].classList.add("active");
  headerBtns = Array.from(headerBtns);
  headerBtns.forEach(function (headerBtn, i) {
    headerBtn.addEventListener("click", function () {
      refreshNavBar(i);
    });
  });

  // ----------BTN ELIMINA CATEGORIA----------
  const btnEliminaCategoria = document.createElement("button");
  btnEliminaCategoria.classList.add("btnVista");
  btnEliminaCategoria.textContent = "Elimina Categoria";
  viewBtn.appendChild(btnEliminaCategoria);
  btnEliminaCategoria.addEventListener("click", function () {
    let v = prompt("Inserisci categoria");
    //ciclo for
    let contElimina = 0;
    for (let i = 0; i < objPeople.length; i++) {
      if (objPeople[i].category == v) {
        objPeople.splice(i, 1);
        contElimina++;
        i--;
      }
    }
    alert(`"Eliminazione della categoria ${v} (${contElimina} eliminati) `);
    localStorage.setItem("bookstore_json", JSON.stringify(objPeople));
    refreshNavBar(0);
  });

  // ----------BTN ORDINA PER TITOLO----------
  const btnSort = document.createElement("button");
  btnSort.classList.add("btnVista");
  btnSort.textContent = "Ordina per titolo";
  viewBtn.appendChild(btnSort);
  btnSort.addEventListener("click", function() {
	  
	  objPeople.sort(function(a, b) {
		  if (a.title < b.title) {
			  return -1; 
		  }
		  if (a.title > b.title) {
			  return 1; 
		  }
		  return 0; 
	  });
  
	  localStorage.setItem("bookstore_json", JSON.stringify(objPeople));
	  loadTable();
	  refreshNavBar(0);
  });
  
  let json = localStorage.getItem("bookstore_json");
  if (!json) {
    json = bookstore;
  }
  let objPeople = JSON.parse(json);
  console.log(objPeople);

  // Carica dati
  `{
		"id" : "1",
		"title" : "Everyday Italian", 
		"category" : "cooking",
		"lang" : "en", 
		"authors" : ["Giada De Laurentiis"],
		"year" : "2005",
		"price" : "30.00"
	}`;
  const detailsBtns = detailsView.querySelectorAll(".button");
  for (const btn of detailsBtns) {
    btn.addEventListener("click", naviga);
  }
  let primo = detailsBtns[0];
  let indietro = detailsBtns[1];
  let avanti = detailsBtns[2];
  let ultimo = detailsBtns[3];
  let elimina = detailsBtns[4];
  loadTable();

  //----------CARICA TABELLA----------

  function loadTable() {
    tBody.innerHTML = "";
    for (let i = 0; i < objPeople.length; i++) {
      let tr = document.createElement("tr");
      tBody.appendChild(tr);

      let td = document.createElement("td");
      tr.appendChild(td);
      
      td.textContent = objPeople[i].id;

      td = document.createElement("td");
      tr.appendChild(td);
      td.addEventListener("click", function(){
        //cerca su google testo del td
        window.open("https://www.google.com/search?q="+objPeople[i].title);
      })
      td.style.cursor = "pointer";
      td.textContent = objPeople[i].title;

      td = document.createElement("td");
      tr.appendChild(td);
      td.addEventListener("click", function(){
        //cerca su google testo del td
        window.open("https://www.google.com/search?q="+objPeople[i].category);
      })
      td.style.cursor = "pointer";
      td.textContent = objPeople[i].category;

      td = document.createElement("td");
      tr.appendChild(td);
    
      td.textContent = objPeople[i].lang;

      td = document.createElement("td");
      tr.appendChild(td);
      td.addEventListener("click", function(){
        //cerca su google testo del td
        window.open("https://www.google.com/search?q="+objPeople[i].authors);
      })
      td.style.cursor = "pointer";
      let autori = objPeople[i].authors;
      td.textContent = autori.join(", ");

      td = document.createElement("td");
      tr.appendChild(td);
      
      td.textContent = objPeople[i].year;

      td = document.createElement("td");
      tr.appendChild(td);
      td.textContent = "€ "+objPeople[i].price;

      td = document.createElement("td");
      tr.appendChild(td);
      const btnDelete = document.createElement("button");
      btnDelete.textContent = "Delete";
      td.appendChild(btnDelete);
      btnDelete.addEventListener("click", function () {
        console.log("eliminato");
        deleteBook(objPeople[i].id);
        loadTable();
      });
    }
  }
  //----------GESTIONE VIEWS----------
  function refreshNavBar(i) {
    // i--
    for (const btn of headerBtns) {
      btn.classList.remove("active");
    }
    headerBtns[i].classList.add("active");

    //gestione delle VIEWS
    if (i != 3) {
      for (const view of views) {
        view.style.display = "none";
      }

      console.log(views[i]);
      views[i].style.display = "block";

      if (i == 0) loadTable();
      else if (i == 1) {
        inizializzaBtns();
        loadDetails();
      } else fillForm();
    } else {
      // SALVA SU DISCO
      alert("Saved on disk");
      refreshNavBar(0);
      localStorage.setItem("bookstore_json", JSON.stringify(objPeople));
    }
  }
  //----------GESTIONE DETAILS BUTTON----------
  function inizializzaBtns() {
    primo.disabled = true;
    indietro.disabled = true;

    if (objPeople.length < 2) {
      avanti.disabled = true;
      ultimo.disabled = true;
    } else {
      avanti.disabled = false;
      ultimo.disabled = false;
    }

    spanCount.textContent = currentBookIndex + 1 + "/" + objPeople.length;

    if (objPeople.length <= 0) {
      elimina.disabled = true;
      spanCount.textContent = "0/0";
    } else elimina.disabled = false;
  }
  //---------- BUTTON PRIMO AVANTI INDIETRO ULTIMO ELIMINA SALVA----------
  function naviga() {
    switch (this.textContent) {
      case "Primo":
        currentBookIndex = 0;
        primo.disabled = true;
        indietro.disabled = true;
        avanti.disabled = false;
        ultimo.disabled = false;
        break;

      case "Indietro":
        currentBookIndex--;
        if (currentBookIndex == 0) {
          primo.disabled = true;
          indietro.disabled = true;
        }
        avanti.disabled = false;
        ultimo.disabled = false;
        break;

      case "Avanti":
        currentBookIndex++;
        if (currentBookIndex == objPeople.length - 1) {
          avanti.disabled = true;
          ultimo.disabled = true;
        }
        primo.disabled = false;
        indietro.disabled = false;
        break;

      case "Ultimo":
        currentBookIndex = objPeople.length - 1;
        primo.disabled = false;
        indietro.disabled = false;
        avanti.disabled = true;
        ultimo.disabled = true;
        break;
      case "Elimina":
        deleteBook(objPeople[currentBookIndex].id);
        currentBookIndex = 0;
        refreshNavBar(0);
        break;
      case "Salva":
        objPeople[currentBookIndex].id =
          document.querySelectorAll("input[type=text]")[0].value;
        objPeople[currentBookIndex].title =
          document.querySelectorAll("input[type=text]")[1].value;
        objPeople[currentBookIndex].category =
          document.querySelectorAll("input[type=text]")[2].value;
        objPeople[currentBookIndex].lang =
          document.querySelectorAll("input[type=text]")[3].value;
        objPeople[currentBookIndex].authors = document
          .querySelectorAll("input[type=text]")[4]
          .value.split(",");
        objPeople[currentBookIndex].year =
          document.querySelectorAll("input[type=text]")[5].value;
        objPeople[currentBookIndex].price =
          document.querySelectorAll("input[type=text]")[6].value;

        localStorage.setItem("bookstore_json", JSON.stringify(objPeople));
        loadTable();
        refreshNavBar(0);
        break;
    }
    spanCount.textContent = currentBookIndex + 1 + "/" + objPeople.length;
    loadDetails();
  }

  //----------CARICAMENTO DETAILS----------
  function loadDetails() {
    details.innerHTML = "";

    if (objPeople.length > 0) {
      const book = objPeople[currentBookIndex];
      //   readBook(book);

      let lbl = document.createElement("label");
      details.appendChild(lbl);
      lbl.textContent = "Id: ";
      let txt = document.createElement("input");
      txt.type = "text";
      details.appendChild(txt);
      txt.value = objPeople[currentBookIndex].id;

      lbl = document.createElement("label");
      details.appendChild(lbl);
      lbl.textContent = "Titolo: ";
      txt = document.createElement("input");
      txt.type = "text";
      details.appendChild(txt);
      txt.value = objPeople[currentBookIndex].title;

      lbl = document.createElement("label");
      details.appendChild(lbl);
      lbl.textContent = "Categoria: ";
      txt = document.createElement("input");
      txt.type = "text";
      details.appendChild(txt);
      txt.value = objPeople[currentBookIndex].category;

      lbl = document.createElement("label");
      details.appendChild(lbl);
      lbl.textContent = "Lingua: ";
      txt = document.createElement("input");
      txt.type = "text";
      details.appendChild(txt);
      txt.value = objPeople[currentBookIndex].lang;

      lbl = document.createElement("label");
      details.appendChild(lbl);
      lbl.textContent = "autori: ";
      txt = document.createElement("input");
      txt.type = "text";
      details.appendChild(txt);
      txt.value = objPeople[currentBookIndex].authors.join(",");

      lbl = document.createElement("label");
      details.appendChild(lbl);
      lbl.textContent = "Anno: ";
      txt = document.createElement("input");
      txt.type = "text";
      details.appendChild(txt);
      txt.value = objPeople[currentBookIndex].year;

      lbl = document.createElement("label");
      details.appendChild(lbl);
      lbl.textContent = "Prezzo: ";
      txt = document.createElement("input");
      txt.type = "text";
      details.appendChild(txt);
      txt.value = objPeople[currentBookIndex].price;
    }
  }
  //----------ELIMINA LIBRO
  function deleteBook(id) {
    for (let i = 0; i < objPeople.length; i++) {
      if (objPeople[i].id == id) {
        // Rimuove il libro dall'array
        objPeople.splice(i, 1);
        break;
      }
    }
    // Aggiorna il localStorage con la chiave corretta
    localStorage.setItem("bookstore_json", JSON.stringify(objPeople));
    // Aggiorna la visualizzazione
    refreshNavBar(currentBookIndex);
  }

  //----------FORM----------
  function fillForm() {
    newDetail.innerHTML = "";
    newDetailBtn.innerHTML = "";

    let lbl = document.createElement("label");
    newDetail.appendChild(lbl);
    lbl.textContent = "Id: ";
    let idInput = document.createElement("input");
    idInput.type = "number";
    idInput.required = true;
    newDetail.appendChild(idInput);

    lbl = document.createElement("label");
    newDetail.appendChild(lbl);
    lbl.textContent = "Titolo: ";
    let titleInput = document.createElement("input");
    titleInput.required = true;
    newDetail.appendChild(titleInput);

    lbl = document.createElement("label");
    newDetail.appendChild(lbl);
    lbl.textContent = "Categoria: ";
    let categoryInput = document.createElement("input");
    newDetail.appendChild(categoryInput);

    lbl = document.createElement("label");
    newDetail.appendChild(lbl);
    lbl.textContent = "Lingua: ";
    let langInput = document.createElement("input");
    newDetail.appendChild(langInput);

    lbl = document.createElement("label");
    newDetail.appendChild(lbl);
    lbl.textContent = "Autori: ";
    let authorsInput = document.createElement("input");
    newDetail.appendChild(authorsInput);

    lbl = document.createElement("label");
    newDetail.appendChild(lbl);
    lbl.textContent = "Anno: ";
    let yearInput = document.createElement("input");
    yearInput.type = "number";
    yearInput.min = "1400";
    let date = new Date();
    yearInput.max = date.getFullYear();
    newDetail.appendChild(yearInput);

    lbl = document.createElement("label");
    newDetail.appendChild(lbl);
    lbl.textContent = "Prezzo: ";
    let priceInput = document.createElement("input");
    priceInput.type = "number";
    priceInput.min = "0";
    newDetail.appendChild(priceInput);

    const btnAggiungi = document.createElement("button");
    btnAggiungi.textContent = "SALVA";
    btnAggiungi.classList.add("button");
    newDetailBtn.appendChild(btnAggiungi);

    btnAggiungi.addEventListener("click", function () {
      // Crea un nuovo oggetto libro con i dati inseriti dall'utente
      const nuovoLibro = {
        id: idInput.value,
        title: titleInput.value,
        category: categoryInput.value,
        lang: langInput.value,
        authors: authorsInput.value.split(","),
        year: yearInput.value,
        price: priceInput.value,
      };

      // Aggiungi il nuovo libro all'array objPeople
      objPeople.push(nuovoLibro);

      // Salva l'array aggiornato nel localStorage
      localStorage.setItem("bookstore_json", JSON.stringify(objPeople));

      // Torna alla vista della lista e aggiorna la tabella
      refreshNavBar(0);
    });
  }
};
