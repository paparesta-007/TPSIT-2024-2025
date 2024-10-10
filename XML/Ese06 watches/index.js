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

    console.log(genere);
    loadTable(genere);
  });
  let code, price, color, image;

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
    thead.innerHTML = "";
    let tr = document.createElement("tr");
    thead.appendChild(tr);

    for (const header of headers) {
      let th = document.createElement("th");
      th.textContent = header;
      tr.appendChild(th);
    }

    let orologi = xmlRoot.querySelectorAll("catalog_item");

    for (const watch of orologi) {
      let watchGender = watch.getAttribute("gender");

      if (genere == "All" || genere == "" || watchGender == genere) {
        let models = watch.querySelectorAll("model");

        for (const model of models) {
          // Leggo i dati per ogni modello
          readWatches(model);
          const tr = document.createElement("tr");
          let td = document.createElement("td");
          td.style.textAlign = "center";
          td.textContent = watchGender;
          tr.appendChild(td);

          td = document.createElement("td");
          td.style.textAlign = "center";
          td.textContent = code;
          tr.appendChild(td);

          td = document.createElement("td");
          td.style.textAlign = "center";
          td.textContent = price;
          tr.appendChild(td);

          td = document.createElement("td");
          td.style.textAlign = "center";
          td.textContent = color;
          tr.appendChild(td);

          td = document.createElement("td");
          td.style.textAlign = "center";
          let img = document.createElement("img");
          img.src = "./img/" + image;

          img.alt = "Watch image";
          img.width = 50; // Imposta la larghezza dell'immagine

          td.appendChild(img);
          tr.appendChild(td);

          tbody.appendChild(tr);
        }
      }
    }
  }

  function readWatches(model) {
    code = "";
    image = "";
    price = "";
    color = "";

    let codeNode = model.querySelector("code");
    if (codeNode) {
      code = codeNode.textContent;
    }
    let priceNode = model.querySelector("price");
    if (priceNode) {
      price = priceNode.textContent;
    }

    let colorNode = model.querySelector("color");
    if (colorNode) {
      color = colorNode.textContent;
      image = colorNode.getAttribute("image");
    }

    console.log(code, price, color, image);
  }

  btnInserisci.addEventListener("click",function(){
    window.open("inserisci.html","_blank");
  })
};
