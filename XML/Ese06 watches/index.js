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
  let xmlRoot = xmlDoc.firstElementChild;
  

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

    let watchlist=xmlRoot.querySelectorAll("catalog_item");

    for(const item of watchlist) {
        let gender = item.getAttribute("gender");
        let models=item.children;
      
        for(const model of models){
            let code = model.querySelector("code").textContent;
            let price = model.querySelector("price").textContent;
            let watches = model.querySelector("watches");

            for(const colorWatch of watches.children) {
              let color = watches.querySelector("color").textContent;
              let image = watches.querySelector("color").getAttribute("image");

              let tr=document.createElement("tr");
              tbody.appendChild(tr);
              let td=document.createElement("td");
              td.textContent=gender;
              tr.appendChild(td);

              td=document.createElement("td");
              td.textContent=code;
              tr.appendChild(td);

              td=document.createElement("td");
              td.textContent=price;
              tr.appendChild(td);

              td=document.createElement("td");
              td.textContent=color;
              tr.appendChild(td);

              td=document.createElement("td");
              let img=document.createElement("img");
              img.src="img/"+image;
              td.appendChild(img);
              tr.appendChild(td);
            }
        }
     

    }
  }
};