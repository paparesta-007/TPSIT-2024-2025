"use strict"

const X0 = 152
const Y0 = 109;

const VERDE = "rgba(0, 200, 0, 0.5)"  // semitrasparente
const ROSSO = "rgba(255, 0, 0, 0.5)"  // semitrasparente
const BLU  =  "rgba(0, 0, 255, 0.5)"  // semitrasparente

let nomeFila =["T","S","R","Q","P","O","N","M","L","I",  "H","G","F","E","D","C","B","A"]
let nomeColonna=[28,26,24,22,20,18,16,14,12,10,8,6,4,2,  1,3,5,7,9,11,13,15,17,19,21,23,25,27]
let spettacoloCount=0;
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
	let vetBiglietti = [];
    divMappa.style.display = "none"; // Nasconde il divMappa
	let spettacoloSelezionato;
	let datiSpettacoli=inviaRichiesta("GET","/spettacoli");
	datiSpettacoli.catch(errore)
	datiSpettacoli.then(function(response){
        datiSpettacoli=response.data
		caricaSpettacoli()
    })
	let dataNow=new Date()
	let year=dataNow.getFullYear()
	let month=dataNow.getMonth()+1
	let day=dataNow.getDate()
	console.log(year,month,day)
	

	function caricaSpettacoli() {
		for(const spettacolo of datiSpettacoli){
			spettacoloCount++;
			let idSpettacolo=spettacoloCount
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
			let dataOggi=new Date(`${year}-${month}-${day}`)
			console.log(dataOggi)
			let dataSpettacolo=new Date(spettacolo["data-utc"])
			if(dataSpettacolo>dataOggi){
				console.log(spettacolo["data-utc"])
				btnAcquista.disabled=false
			}
			else{
				btnAcquista.disabled=true	
			}
			 btnAcquista.addEventListener("click", function() {
				spettacoloSelezionato=idSpettacolo
                $(divSpettacoli).fadeOut();
				$(divMappa).fadeIn();
				let h3=$("#wrapper h3").text(spettacolo.titolo)
				let p=$("#wrapper p").eq(0).text(spettacolo.data)
				caricaPosto()
				async function caricaPosto() {

					mappa.innerHTML = "";
					let response= await inviaRichiesta("GET",`/spettacolo_${idSpettacolo}`).catch(errore)
					let dataPosti=response.data
					console.log(dataPosti)
					let i = 1;
        			let riga = 0;
					let col9=0
					for (let fila = 0; fila < nomeFila.length; fila++) {
						let colInizio = inizioFine[fila].inizio;
						let colFine = inizioFine[fila].fine;
						let colonna = 0;
						for (let col = colInizio; col <= colFine; col++) {
							
							let div = document.createElement("div");
							
							div.classList.add("poltrona");
							let nomePosto = nomeFila[fila] + nomeColonna[colonna];
							// div.textContent = nomePosto;
					
							console.log(nomePosto);
							div.id = nomePosto;
							// console.log(dataPosti[idPosto].statoPrenotazione)
							
					
							let posY = Y0 + (17.5 * fila);
							if (fila > 9) {
								posY += 24; // Spazio per il corridoio orizzontale
								
							}
							let posX = X0 + (16.5 * (col - colInizio));
							if(fila>9){
								switch (fila) {
									case 10:
										posX+=16.5
										break;
									case 10:
										posX+=16.5
										break;
									case 11:
										posX+=16.5*2
										break;
									case 12:
										posX+=16.5*2
										break
									case 13:
										posX+=16.5*3
										break;
									case 14:
										posX+=16.5*3
										break;

									case 15:
										posX+=16.5*4
										break
									case 16:
										posX+=16.5*4
										break;
									case 17:
										posX+=16.5*4
										break;
									default:
										break;
								}
							}
							if (col > 13) {
								posX += 33; // Spazio per il corridoio verticale
							}
					
							div.style.left = posX + "px";
							div.style.top = posY + "px";
							div.addEventListener("click", function() {
								if (div.style.backgroundColor == VERDE) {
									div.style.backgroundColor = BLU;
									vetBiglietti.push(idPosto)
									console.log(vetBiglietti)
								}
								else if (div.style.backgroundColor == BLU) {
									div.style.backgroundColor = VERDE;
									vetBiglietti.splice(vetBiglietti.indexOf(idPosto),1)
									console.log(vetBiglietti)
								}
							})
							mappa.appendChild(div);
							colonna++;
							let idPosto = i++;
							if (dataPosti[idPosto] && dataPosti[idPosto].statoPrenotazione == "booked") {

								div.style.backgroundColor = ROSSO;
							}
							else{
								div.style.backgroundColor = VERDE;
							}
							div.style.cursor = "pointer";
							// div.textContent=idPosto
						}
						riga++;
					}
					console.log(i)
				}
            })
		}
		btnAcquista.addEventListener("click", async function() {
			for (const biglietto of vetBiglietti) {
				let response = await inviaRichiesta("PATCH", `/spettacolo_${spettacoloSelezionato}/${biglietto+1}`, {
					statoPrenotazione: "booked"  // <-- Aggiorna il valore dello stato
				}).catch(errore);
		
				
			}
		
			// Svuota l'array dopo l'acquisto
			vetBiglietti = [];
		});
	}
	
	
});

