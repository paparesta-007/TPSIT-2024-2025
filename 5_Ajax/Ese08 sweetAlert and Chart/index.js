"use strict";

$(document).ready(function () {
	const wrapper = document.getElementById("wrapper");
	const table = document.querySelector("table");
	const canvasContainer = document.getElementById("canvas");
	const canvas = document.querySelector("canvas");
	const btnInvia = document.getElementById("btnInvia");
	let backgroundColor=[]
	$("a").hide();
	$(table).hide();
	$(canvasContainer).hide()

	let chart;
	// spiega
	$(canvasContainer).hide()


	btnInvia.addEventListener("click", async function () {
		let result = await Swal.fire({
			title: "<b>How many people?</b>",
			input: "range",
			inputAttributes: {
				min: 0,
				max: 100,
				step: 1
			},
			inputValue: 50,
			width: 400,
			background: "#fff",
			confirmButtonText: "Invia",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",

		})
		let nPeople = result.value
		console.log(nPeople)
		//{nazioni:"italia",persone:3}
		let nazioni = [];
		let request = inviaRichiesta("GET", "/api", { "results": nPeople })
		request.catch(errore);
		request.then(function (responseHttp) {
			let people = responseHttp.data.results;
			for (const person of people) {
				let item = nazioni.find(item => item.nazione == person.location.country)
				if (item) {
					item.persone++
				}
				else {
					nazioni.push({ nazione: person.location.country, persone: 1 })
				}
			}
			console.log(nazioni)
			$("a").eq(0).show();

			//salvo tabella in formato json sul disco
			let json=JSON.stringify(nazioni,null,2);
			let blob = new Blob([json], { type: "application/json" });

			let uriBlob=URL.createObjectURL(blob);
			$("a").eq(0).attr({
				href: uriBlob,
				download: "data.json"
			});
			$(table).show();
			let tbody = table.querySelector("tbody");
			tbody.innerHTML = "";
			for (const nation of nazioni) {
				let tr = document.createElement("tr");
				let td = document.createElement("td");
				td.innerHTML = nation.nazione;
				tr.appendChild(td);
				td = document.createElement("td");
				td.innerHTML = nation.persone;
				tr.appendChild(td);
				tbody.appendChild(tr);
			}

			//creazione grafico
			$(canvasContainer).show()
			let keys = nazioni.map(item => item.nazione);
			let values=nazioni.map(item=>item.persone)
			for(let i=0;i<keys.length;i++){
				backgroundColor.push(`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)}`)
			}
			//al suo interno trova il valore massimo
			let max=Math.max(...values)
			let chartOptions={
				"type":"bar",
				"data":{
					"labels":keys,
					"datasets":[
						{
							"label":"Persone",
							"data":values,
							"backgroundColor":backgroundColor,
							"borderColor":"#000",
							"borderWidth":1
						}
					]
				},
				"options":{
					"scales":{
						"y":{
							"suggestedMax":max+1,

						}
					}
				}
			}
			$("canvasContainer").show()
			if(chart){
				chart.destroy()
			}
			chart=new Chart(canvas,chartOptions)
			$("a").eq(1).show().on("click",function(){
				this.href=chart.toDataURL("chart.png")
			})
		})

	})

})