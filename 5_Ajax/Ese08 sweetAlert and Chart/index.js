﻿"use strict";

$(document).ready(function () {
	const wrapper = document.getElementById("wrapper");
	const table = document.querySelector("table");
	const canvasContainer = document.getElementById("canvas");
	const canvas = document.querySelector("canvas");
	const btnInvia = document.getElementById("btnInvia");

	$("a").hide();
	$(table).hide();
	$(canvasContainer).hide()

	let chart;
	// spiega



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
			
		})

	})

})
