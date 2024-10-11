"use strict";

window.onload = function () {
  let _btnSalva = document.getElementById("btnSalva");
  let _btnAnnulla = document.getElementById("btnAnnulla");
  let _txtCode = document.getElementById("txtCode");
  let _txtPrice = document.getElementById("txtPrice");
  let _lstColor = document.getElementById("lstColor");
  let _optsGender = document.getElementsByName("optGender");

  _btnAnnulla.addEventListener("click", function () {
    window.close();
  });

  _btnSalva.addEventListener("click", function () {
    if (_txtCode.value !== "" && _txtPrice.value !== "") {
      // Recupera il file XML dal localStorage o utilizza l'oggetto `orologi` di default
      let xml = localStorage.getItem("orologi_xml");
      if (!xml) {
        xml = orologi; // Variabile 'orologi' deve essere predefinita altrove nel codice
        console.log("Successfully loaded orologi");
      }

      const parser = new DOMParser();
      let xmlDoc = parser.parseFromString(xml, "text/xml");
      let xmlRoot = xmlDoc.firstElementChild;

      // Selezioniamo il genere selezionato dal radio button
      let gender = document.querySelector("input[type=radio]:checked").value;
      console.log(gender);

      // Troviamo il nodo corrispondente al catalog_item per il genere
      let watchesGender = xmlRoot.querySelector("catalog_item[gender='" + gender + "']");

      // Creiamo il modello usando una stringa template
      let model = `
      <model>
        <code>${_txtCode.value}</code>
        <price>${_txtPrice.value}</price>
        <watches>
          <color image="${_lstColor.value.toLowerCase()}_cardigan.jpg">${_lstColor.value}</color>
        </watches>
      </model>`;

      watchesGender.appendChild(model);
    }
    else {
      alert("Inserisci tutti i dati");
    }
    let serializer = new XMLSerializer();
      let newXml = serializer.serializeToString(xmlDoc);
      localStorage.setItem("orologi_xml", newXml);


  })

};
