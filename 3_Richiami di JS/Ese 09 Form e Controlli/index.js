'use strict'
let form1;

window.onload = function () {
	form1 = document.getElementById("form1")
	let biblioteca=[
		{"name": "porcodio"},
		{"data":"12/04/2024"},
		{"prezzo": 15.99},
		

	]
	biblioteca[3].name="papa";

}

// richiamato dall'html
function visualizza(index) {
	let msg = "";
	let items;
	switch (index) {
		case 1:
			let txt=form1.querySelector("input[type=text]");
			msg=txt.value
			break;
		case 2:
			const lst=form1.querySelector("select").firstElementChild;
			msg=lst.value;
			break;
		case 3:
			const chks=form1.querySelectorAll("input[type=checkbox]");
			for(const chk of chks){
				msg+=chk.name+" "+chk.value+"\n";
			}
			break;
		case 4:
			const chks2=form1.querySelectorAll("input[type=checkbox]:checked");
			for(const chk of chks2){
				msg+=chk.name+" "+chk.value+"\n";
			}
			break;
		case 5:
			const chks3=form1.querySelectorAll("input[type=checkbox]:not(:checked)");
			for(const chk of chks3){
				msg+=chk.name+" "+chk.value+"\n";
			}
			break;
		case 6:
			const opt1=form1.querySelectorAll("input[type=radio]:checked");
			for(const opt of opt1){
				msg+=opt.name+" "+opt.value+"\n";
			}
			break;
		case 7:
			const opt2=form1.querySelectorAll("input[type=checkbox]:not(:checked)");
			for(const opt of opt2){
				msg+=opt.name+" "+opt.value+"\n";
			}
			break;
			case 8:
				const lsts = form1.querySelectorAll("select");
				const lst2 = lsts[lsts.length - 1]; // Get the last select element
				for (const option of lst2.selectedOptions) {
					msg += option.value + "\n"; // Append the value of each selected option
				}
				break;
			
	}
	alert(msg);
}


function imposta(index){
	switch(index){
		case 1:
			let text = prompt("Inserisci il contenuto del text box: ");
			form1.querySelector("input[type=text]").value = text;
			break;
		case 2:
			let valLst1 = prompt("Inserisci il valore del select: ");
			const lst1 = form1.querySelector("select");

			for (const opt of lst1.children) {
				if(opt.textContent == valLst1.toLowerCase() || opt.value == valLst1.toLowerCase())
					opt.selected = true;
				else
					opt.selected = false;
			}
			break;
		case 3:
			let valChk = prompt("Inserisci il valore del checkbox: ");
			const chks = form1.querySelectorAll("input[type=checkbox]");

			for (const chk of chks) {
				let s = chk.parentElement.textContent.trim();

				if(s == valChk.toLowerCase() || chk.value == valChk.toLowerCase())
					chk.checked = true;
			}
			break;
		case 4:
			let valOpt = prompt("Inserisci il valore del checkbox: ");
			const opts = form1.querySelectorAll("input[type=radio]");

			for (const opt of opts) {
				if(opt.value == valOpt.toLowerCase())
					opt.checked = true;
			}
			break;
		case 5:
			let valLst2 = prompt("Inserisci il valore del select multiple: ");
			const lst2 = form1.querySelector("select[multiple]");

			for (const opt of lst2.children) {
				if(opt.textContent == valLst2.toLowerCase() || opt.value == valLst2.toLowerCase())
					opt.selected = true;

			}
			break;
	}	 
	
}

