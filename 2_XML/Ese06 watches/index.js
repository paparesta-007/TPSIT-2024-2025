"use strict";
let headers = ["Gender", "Code", "Price", "Color", "Image"];

window.onload = function () {
  let thead = document.querySelector("table thead");
  let tbody = document.querySelector("table tbody");
  let lstGender = document.querySelector(".gender select");
  let btnInserisci = document.getElementsByTagName("button")[0];

  let xml = localStorage.getItem("watches_xml");
  if (!xml) {
    xml = orologi;
  }
  const parser = new DOMParser();
  const xmlDOC = parser.parseFromString(xml, "text/xml");
  const xmlRoot = xmlDOC.firstElementChild;

  let gender="";

  lstGender.addEventListener("change", function () {
    gender = this.value; //Default = ""
     loadTable();
    console.log(gender);
  });

  loadTable()
  btnInserisci.addEventListener("click",function () {
    window.location.href="inserisci.html";
  })

  function createHeaders() {
    thead.innerHTML = ""; // Cancella gli eventuali headers precedenti
    let tr = document.createElement("tr");
    for (let header of headers) {
      let th = document.createElement("th");
      th.textContent = header;
      tr.appendChild(th);
    }
    thead.appendChild(tr);
  }

  function loadTable() {
    tbody.innerHTML = ""; // Cancella gli eventuali righe precedenti
    // thead.innerHTML = ""; // Cancella gli eventuali thead

    createHeaders();
    const catalogItem=xmlRoot.querySelectorAll("catalog_item");
    
    for(const item of catalogItem){
      let genereOrologio=item.getAttribute("gender");
      if(gender==genereOrologio || gender==""){
      const models=item.children;
      
      for (const model of models) {
        let code=model.querySelector("code").textContent;
        let prezzo=model.querySelector("price").textContent;
        let watches=model.querySelector("watches");
        let colors=watches.children;
        
        for(const color of colors){
          const tr=document.createElement("tr");
          tr.style.textAlign="center"
          tbody.appendChild(tr);

          let td=document.createElement("td");
          tr.appendChild(td);
          // td.style.textAlign="center";
          td.textContent=genereOrologio;

          td=document.createElement("td");
          tr.appendChild(td);
          // td.style.textAlign="center";

          td.textContent=code;

          td=document.createElement("td");
          tr.appendChild(td);
          // td.style.textAlign="center";

          td.textContent=prezzo;

          td=document.createElement("td");
          tr.appendChild(td);
          // td.style.textAlign="center";

          td.textContent=color.textContent

          td=document.createElement("td");
          td.style.textAlign="center";

          let img=document.createElement("img");
          img.src=`./img/${color.textContent.toLowerCase()}_cardigan.jpg`;
          // img.style.backgroundSize="cover";
          
          td.appendChild(img);
          tr.appendChild(td);


        }
      }
    }
      
      
    }
  }

};
