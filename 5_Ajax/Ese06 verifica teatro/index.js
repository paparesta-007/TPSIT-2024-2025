"use strict"

const X0 = 152
const Y0 = 109;

const VERDE = "rgba(0, 200, 0, 0.5)"  // semitrasparente
const ROSSO = "rgba(255, 0, 0, 0.5)"  // semitrasparente
const BLU  =  "rgba(0, 0, 255, 0.5)"  // semitrasparente

let nomeFila =["T","S","R","Q","P","O","N","M","L","I",  "H","G","F","E","D","C","B","A"]
let nomeColonna=[28,26,24,22,20,18,16,14,12,10,8,6,4,2,  1,3,5,7,9,11,13,15,17,19,21,23,25,27]

let inizioFine = [
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 

	{"inizio":1, "fine":26}, 
	{"inizio":2, "fine":25}, 
	{"inizio":2, "fine":25}, 
	{"inizio":3, "fine":24}, 
	{"inizio":3, "fine":24}, 
	{"inizio":4, "fine":23}, 
	{"inizio":4, "fine":23}, 
	{"inizio":4, "fine":23}, 
]


document.addEventListener("DOMContentLoaded", function() {
    let wrapper = document.getElementById("wrapper");
    let divSpettacoli = document.getElementById("divSpettacoli");
    let divMappa = document.getElementById("divMappa");

    let mappa = divMappa.querySelector("div"); // Seleziona il primo div dentro divMappa
    let titolo = wrapper.querySelector("h3"); // Seleziona il primo h3 dentro wrapper
    let sottotitolo = wrapper.querySelector("p"); // Seleziona il primo p dentro wrapper
    let btnAcquista = divMappa.querySelector("button"); // Seleziona il primo button dentro divMappa

    divMappa.style.display = "none"; // Nasconde il divMappa

	let datiSpettacoli=inviaRichiesta("GET","/spettacoli");
	datiSpettacoli.catch(errore)
	datiSpettacoli.then(function(response){
        datiSpettacoli=response.data
		caricaSpettacoli()
    })
	

	function caricaSpettacoli() {
		for(const spettacolo of datiSpettacoli){
			let div=document.createElement('div')
			divSpettacoli.appendChild(div)

			let divImg=document.createElement("div")
			divImg.classList.add("img")
			div.appendChild(divImg)

			let img=document.createElement("img")
            img.src="./img/"+spettacolo.titolo+".jpg"
            divImg.appendChild(img)

			let divDetails=document.createElement("div")
			divDetails.classList.add("details")
			div.appendChild(divDetails)

			let p=document.createElement("p")
			p.textContent=spettacolo.titolo
			divDetails.appendChild(p)

			p=document.createElement("p")
			p.textContent=spettacolo.autore
			divDetails.appendChild(p)

			p=document.createElement("p")
            p.textContent=spettacolo.data
            divDetails.appendChild(p)

			p=document.createElement("p")
            p.textContent=spettacolo.prezzo
            divDetails.appendChild(p)

			let btnAcquista=document.createElement("button")
			btnAcquista.textContent="Acquista biglietti"
			divDetails.appendChild(btnAcquista)
			 btnAcquista.addEventListener("click", function() {
                $(divSpettacoli).fadeOut();
				$(divMappa).fadeIn();
				let h3=$("#wrapper h3").text(spettacolo.titolo)
				let p=$("#wrapper p").text(spettacolo.data)
            })
		}
	}
});
