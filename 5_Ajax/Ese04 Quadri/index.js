"use strict"

$(function () {
    let _head = $('.head').get(0);
    let _info = $('.info').get(0);
    let _img = $('.img').get(0);
    let _btnPrev = $('button').get(0);
    let _btnNext = $('button').get(0);
	let _wrapperAdd = $('.wrapper').get(0);
	
    // _btnPrev.prop("disabled", true)
	getArtists()
    async function getArtists(){
        let response=await inviaRichiesta("GET","/artisti").catch(errore)
        let artists=response.data
        for(const artist of artists){
            const lbl=document.createElement("label")
            const input=document.createElement("input")
            input.type="radio"
            input.name="artist"
            lbl.appendChild(input)
            _head.appendChild(lbl)
            lbl.innerHTML+=artist.name
        }    
        let nArtista=random(0, artists.length-1)
        let radioButton=_head.querySelector("input[type'radio']:checked")
    }


})
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
