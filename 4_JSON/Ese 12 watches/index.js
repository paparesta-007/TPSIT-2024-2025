"use strict";
let headers = ["Gender", "Code", "Price", "Color", "Image"];

window.onload = function () {
  let thead = document.querySelector("table thead");
  let tbody = document.querySelector("table tbody");
  let lstGender = document.querySelector(".gender select");
  let btnInserisci = document.getElementsByTagName("button")[0];

  let gender="";

  lstGender.addEventListener("change", function () {
    gender = this.value; //Default = ""
    //  loadTable();
    console.log(gender);
  });
  loadTable();
  
  function loadTable() {
    for(const key in orologi[key]){
      console.log(key);
    }
  }

};
