"use strict";

window.onload = function () {
  let _btnSalva = document.getElementById("btnSalva");
  let _btnAnnulla = document.getElementById("btnAnnulla");
  let _txtCode = document.getElementById("txtCode");
  let _txtPrice = document.getElementById("txtPrice");
  let _lstColor = document.getElementById("lstColor");
  let _optsGender = document.getElementsByName("optGender");

  _btnAnnulla.addEventListener("click", function () {
    window.location.href = "./index.html";
	// window.close();
  });

  let xml = localStorage.getItem("watches_xml");
  if (!xml) {
    xml = orologi;
  }
  const parser = new DOMParser();
  const xmlDOC = parser.parseFromString(xml, "text/xml");
  const xmlRoot = xmlDOC.firstElementChild;

  let gender;
  for (const opt of _optsGender) {
	if (opt.ariaChecked) {
	  gender = opt.value;
	  break;
	}
  }
  _btnSalva.addEventListener("click", function () {
    if (_txtCode.value!= "" && _txtPrice.value!= "") {
		if(_txtPrice.vale!="" && _txtCode.vale!=""){

		}
	}});
    

};
