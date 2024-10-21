"use strict";

let wrapper;

window.onload = function () {
  wrapper = document.querySelector("#wrapper");
  let buttonsDiv = document.querySelector("#buttons");
  let btns = buttonsDiv.querySelectorAll("input[type=button]");
  let btnContaNElementi=buttonsDiv.getElementsByTagName("input")[0];
  let btnColoraIndice = buttonsDiv.getElementsByTagName("input")[3]; // Usa input al posto di button

  btnContaNElementi.addEventListener("click",function(){
	let n = wrapper.children.length;
	alert(`Ci sono ${n} elementi`)
  })
  
  btnColoraIndice.addEventListener("click", function () {
    let i = 0;

    for (const item of wrapper.children) {
      if (i % 2 === 1) {
        item.style.backgroundColor = `rgb(0, ${50 * (i + 1)}, 0)`;
      }
      i++;
    }
  });
};

function evidenzia(selector) {
  for (const item of wrapper.children) {
    item.style.backgroundColor = "";
    if (item.matches(selector)) {
      item.style.backgroundColor = "yellow";
    }
  }
}
