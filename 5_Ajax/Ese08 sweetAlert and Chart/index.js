﻿"use strict";

$(document).ready(function(){		
	const wrapper = document.getElementById("wrapper");
    const table = document.querySelector("table");
    const canvasContainer = document.getElementById("canvas");
    const canvas = document.querySelector("canvas");
	const btnInvia = document.getElementById("btnInvia");

	// // $("a").hide();
	// // table.hide();
	// canvasContainer.hide()
	
	let chart;
	// spiega



	btnInvia.addEventListener("click", async function(){
		let result=await Swal.fire({
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

	})
	
})
