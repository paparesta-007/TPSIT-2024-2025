"use strict";

const headers = ["Name", "City", "State", "Nat", "", ""];
const headersWidth = ["25%", "25%", "25%", "10%", "7.5%", "7.5%"];
let currentPage = 0;
let gender = "male";

window.onload = function () {
  const opts = document.querySelectorAll("#optWrapper input");
  const table = document.querySelector("table");
  const btns = document.querySelectorAll("#buttons input");
  const details = document.getElementById("details");
  const nPag = document.getElementById("nPagina");
  let tbody = document.createElement("tbody");
  table.appendChild(tbody);
  //   localStorage.clear()
  details.style.display = "none";
  let json = localStorage.getItem("people_json");
  if (!json) {
    json = people;
  }
  let objPeople = JSON.parse(json);
  caricaIntestazione();
  loadTable();
  manageBtns();
  console.log(objPeople);

  for (const opt of opts) {
    opt.addEventListener("click", switchGender);
  }

  function switchGender() {
    gender = this.value;
    details.style.display = "none";
    currentPage = 0;
    loadTable();
    manageBtns();
  }

  for (const btn of btns) {
    btn.addEventListener("click", navigate);
  }

  function navigate() {
    switch (this.value) {
      case "Primo":
        currentPage = 0;
        break;
      case "Indietro":
        currentPage--;
        break;
      case "Avanti":
        currentPage++;
        break;
      case "Ultimo":
        currentPage = lastPage();
        break;
    }

    manageBtns();
    loadTable();
    details.style.display = "none";
  }

  function manageBtns() {
    if (currentPage == 0) {
      btns[1].disabled = true;
      btns[2].disabled = false;
    } else if (currentPage == lastPage()) {
      btns[1].disabled = false;
      btns[2].disabled = true;
    } else {
      btns[1].disabled = false;
      btns[2].disabled = false;
    }

    nPag.textContent = currentPage + 1 + "/" + (lastPage() + 1);
  }

  //restituisce l'indice dell'ultima pagina
  function lastPage() {
    return Math.ceil(objPeople[gender].length / 6) - 1;
  }

  function caricaIntestazione() {
    const thead = document.createElement("thead");
    table.appendChild(thead);
    const tr = document.createElement("tr");
    thead.appendChild(tr);

    headers.forEach(function (header, i) {
      const th = document.createElement("th");
      tr.appendChild(th);
      th.textContent = header;
      th.style.width = headersWidth[i];
    });
    table.appendChild(tbody);
  }

  function loadTable() {
    tbody.innerHTML = "";

    let firstRecord = currentPage * 6;
    let selectedPeople = objPeople[gender].slice(firstRecord, firstRecord + 6); // Otteniamo solo i 6 elementi della pagina corrente

    selectedPeople.forEach(function (person) {
      const tr = document.createElement("tr");
      tbody.appendChild(tr);

      let td = document.createElement("td");
      tr.appendChild(td);
      td.textContent = person.name.first + " " + person.name.last;

      td = document.createElement("td");
      td.textContent = person.location.city;
      tr.appendChild(td);

      td = document.createElement("td");
      td.textContent = person.location.state;
      tr.appendChild(td);

      td = document.createElement("td");
      td.textContent = person.nat;
      tr.appendChild(td);

      // Prima icona con lente
      td = document.createElement("td");
      tr.appendChild(td);
      const img = document.createElement("img");
      img.src = `./img/lente.jpg`;
      img.addEventListener("click", function () {
        showDetails(person);
      });
      img.style.width = "30px";
      td.appendChild(img);

      // Seconda icona con delete
      td = document.createElement("td");
      tr.appendChild(td);
      const img2 = document.createElement("img");
      img2.src = `./img/delete.png`;
      img2.style.width = "30px";
      img2.person = person;
      img2.addEventListener("click", deletePerson);
      td.appendChild(img2);
    });
  }

  function showDetails(person) {
    details.style.display = "block";
    details.innerHTML = "";

    let p = document.createElement("p");
    details.appendChild(p);
    p.textContent = "mail: " + person.email;

    const img = document.createElement("img");
    details.appendChild(img);
    img.src = person.picture.large;

    p = document.createElement("p");
    details.appendChild(p);
    p.textContent = "phone: " + person.phone;
  }

  function deletePerson() {
    let person = this.person;

    let selectedPeople = objPeople[gender];
    selectedPeople.forEach(function (p, i) {
      if (p === person) {
        selectedPeople.splice(i, 1);
        loadTable();
        manageBtns(); // Aggiorna i bottoni di navigazione
      }
    });
    localStorage.setItem("people_json", JSON.stringify(objPeople));
  }
};
