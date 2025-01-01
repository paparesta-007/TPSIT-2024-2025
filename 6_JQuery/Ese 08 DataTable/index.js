'use strict'
const URL = "https://randomuser.me/api"

$(document).ready(function(){	
	
	let _table = $("#wrapper").children("table");
	let url = URL + "?results=100";

	let request = $.ajax({"url":url})
	request.fail(errore)
	request.done (function(data){	
		console.log(data)
		
		for (const user of data.results) {
			let tr=$("<tr>",{
				"appendTo":_table,
				"css":{
					"height": "50px"
				}
			})
			let tdNome=$("<td>",{
				"text":user.name.first+" "+user.name.last,
				"appendTo":tr,
			})
			let tdNat=$("<td>",{
				"text":user.nat,
                "appendTo":tr,
			})
			 let tdCountry=$("<td>",{
                "text":user.location.country,
                "appendTo":tr,
            })
			 let tdState=$("<td>",{
                "text":user.location.state,
				"appendTo":tr,
            })
			let tdCells=$("<td>",{
				"text":user.cell,
				"appendTo":tr,
			})
			let tdImg=$("<td>",{
				"appendTo":tr,
				"css":{
					"background-image": `url(${user.picture.thumbnail})`,
					"background-repeat": "no-repeat",
					"background-position": "center",
				},
			})
			
		}


	});		
})






function errore(jqXHR, text_status, string_error) {
    if (jqXHR.status == 0)
        alert("Connection Refused or Server timeout");
	else if (jqXHR.status == 200)
        alert("Formato JSON non corretto : " + jqXHR.responseText);
    else
        alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}