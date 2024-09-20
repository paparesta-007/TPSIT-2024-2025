"use strict";

window.addEventListener("load", function () {
  const content = document.getElementById("content");
  let contProdotti = 0;
  const btnSearch = document.getElementById("btn-search");
  btnSearch.addEventListener("click", showAlert);
  const row = document.createElement("div");
  row.classList.add("row");
  content.appendChild(row);
  const h3 = document.createElement("h3");

  row.appendChild(h3);

  for (const product of products) {
    contProdotti++;
    // Creazione Div Princiapale
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("col-md-4");
    row.appendChild(mainDiv);

    //Creazione Card
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    mainDiv.appendChild(cardDiv);

    //Creazione Immagine Card
    const imgCard = document.createElement("img");
    imgCard.classList.add("card-img-top");
    imgCard.src = `./img/products/product${product[0]}.jpg`;
    console.log(imgCard.src);
    cardDiv.appendChild(imgCard);

    //Creazione Body Card
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardDiv.appendChild(cardBody);

    //Creazione Titolo Card
    const h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.textContent = product[1];
    cardBody.appendChild(h5);

    //Creazione Descrizione Card
    const p = document.createElement("p");
    p.classList.add("card-text");
    let marca = product[2];
    let display = product[3];
    let cpu = product[4];
    let ram = product[5];
    let ssd = product[6];

    let stringInfo;
    stringInfo = `Marca: ${marca} / Display: ${display} / Processore: ${cpu} / RAM: ${ram}GB / Memoria di massa: ${ssd}GB`;
    p.textContent = stringInfo;
    cardBody.appendChild(p);
  }
  h3.textContent = "Numero di prodotti: " + contProdotti;

  function showAlert() {
    document.getElementById("alert-search").classList.remove("d-none");
    setTimeout(nascondiAlert, 3000);
  }

  function nascondiAlert() {
    document.getElementById("alert-search").classList.add("d-none");
  }
});
