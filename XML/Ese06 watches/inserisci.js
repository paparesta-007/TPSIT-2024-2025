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

  for (const opt of _optsGender) {
    opt.addEventListener("change", function () {
      let gender = this.value;
      console.log(gender);
    });
  }
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

  let codeNode = _txtCode.textContent;
  let priceNode = _txtPrice.textContent;
  let colorNode = _lstColor.textContent;
  _btnSalva.addEventListener("click",function() {
    console.log(codeNode,priceNode);
  })
  
};
