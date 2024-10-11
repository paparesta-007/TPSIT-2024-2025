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

  _btnSalva.addEventListener("click",function() {
    if(_txtCode.value!="" && _txtPrice.value!=""){
        let xml = localStorage.getItem("orologi_xml");
        if (!xml) {
          xml = orologi;
          console.log("Successfully loaded orologi");
        }
        const parser = new DOMParser();
        let xmlDoc = parser.parseFromString(xml, "text/xml");
        let xmlRoot = xmlDoc.firstElementChild;

        let gender=document.querySelector("input[type=radio]:checked").value;
        console.log(gender)
        xmlRoot.querySelector("catalog_item[gender="+gender+"]")
    
    }
    else{
        alert("Inserisci tutti i")
    }
   
  
  })
  
};
