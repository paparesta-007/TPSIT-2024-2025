"use strict";
let headers = ["Gender", "Code", "Price", "Color", "Image"];

window.onload = function () {
  let thead = document.querySelector("table thead");
  let tbody = document.querySelector("table tbody");
  let lstGender = document.querySelector(".gender select");
  let btnInserisci = document.getElementsByTagName("button")[0];
  let select = document.querySelector("select");
  let genere = "All";
  select.addEventListener("change", function () {
    genere = this.value;
  });

  let xml = localStorage.getItem("orologi_xml");
  if (!xml) {
    xml = orologi;
    console.log("Successfully loaded orologi");
  } else {
    console.log("Error getting orologi");
  }
  const parser = new DOMParser();
  let xmlDoc = parser.parseFromString(xml, "text/xml");
  let xmlRoot = xmlDoc.documentElement;

  //Creazione della tabella
  loadTable(genere);
  function loadTable(genere) {
    tbody.innerHTML = "";
    let tr = document.createElement("tr");
    thead.appendChild(tr);
    for (const header of headers) {
      let th = document.createElement("th");
      th.textContent = header;
      tr.appendChild(th);
    }
  }
};
