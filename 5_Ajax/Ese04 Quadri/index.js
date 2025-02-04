"use strict";

let quadri = [];
$(function () {
    let _head = $(".head").get(0);
    let _info = document.querySelector(".info");
    let _img = document.querySelector(".img");
    let _btnPrev = $("button").get(0);
    let _btnNext = $("button").get(1);
    let _wrapperAdd = $(".wrapper").get(0);

    let indiceQuadro = 0;
    _btnPrev.disabled = true;

    getArtists();

    async function getArtists() {
        let response = await inviaRichiesta("GET", "/artisti").catch(errore);
        let artisti = response.data;

        artisti.forEach((artista, index) => {


            const input = document.createElement("input");
            input.type = "radio";
            input.name = "artista";
            input.value = artista.id;
            input.dataset.artista = JSON.stringify(artista);
            const lbl = document.createElement("label");
            lbl.innerHTML = artista.name;

            if (index == 0) {
                input.checked = true;
            }

            lbl.insertBefore(input, lbl.firstChild);
            _head.appendChild(lbl);
            input.addEventListener("change", function () {
                let artistaSelezionato = JSON.parse(this.dataset.artista);

                console.log(artistaSelezionato);
                getQuadri(artistaSelezionato);
            });
        });

        getQuadri(artisti[0]);
    }

    async function getQuadri(artista) {
        let response = await inviaRichiesta("GET", "/quadri/", { artist: artista.id }).catch(errore);
        quadri = response.data;
        console.log(quadri);
        visualizzaQuadro();
    }

    async function visualizzaQuadro(pos) {
        let quadro = quadri[indiceQuadro];
        _info.innerHTML = "";

        let div = document.createElement("div");
        _info.appendChild(div);
        div.innerHTML = `ID= <b>${quadro.id}</b>`;

        div = document.createElement("div");
        _info.appendChild(div);
        div.innerHTML = `Titolo: <b>${quadro.title}</b>`;

        let artistaSelezionato = JSON.parse(_head.querySelector('input[type="radio"]:checked').dataset.artista);

        div = document.createElement("div");
        _info.appendChild(div);
        div.innerHTML = `Genere: <b>${artistaSelezionato.gender}</b>`;

        div = document.createElement("div");
        _info.appendChild(div);
        div.innerHTML = `Like: <b>${quadro.nLike}</b>`;
        let imgLike = document.createElement("img");
        imgLike.src = "./img/like.jpg";
        imgLike.style.width = "30px";
        imgLike.style.cursor = "pointer"
        imgLike.addEventListener("click", function () {
            aggiungiLike(quadro)
        })
        div.appendChild(imgLike);

        _img.innerHTML = "";
        let img = document.createElement("img");
        if (!quadro.img.startsWith("data:image/")) {

            img.src = `./img/${quadro.img}`;
        }
        else {
            img.src = quadro.img;
        }
        _img.appendChild(img);
    }
    _btnPrev.addEventListener("click", function () {
        if (indiceQuadro > 0) {
            indiceQuadro--;
            visualizzaQuadro();
        }

        if (indiceQuadro === 0) {
            _btnPrev.disabled = true;
        }
        _btnNext.disabled = false;
    })
    _btnNext.addEventListener("click", function () {
        if (indiceQuadro < quadri.length - 1) {
            indiceQuadro++;
            visualizzaQuadro();
        }
        if (indiceQuadro === quadri.length - 1) {
            _btnNext.disabled = true;
        }
        _btnPrev.disabled = false;
    })

    function aggiungiLike(quadro) {
        let path = "/quadri/" + quadro.id
        let response = inviaRichiesta("PATCH", path, { "nLike": (quadro.nLike + 1) })
        response.catch(errore);
        response.then(function (response) {
            console.log(response)
            visualizzaQuadro(quadro)
        })
    }

    btnSalva.addEventListener("click", function () {
        let blob = txtFile.files[0];
        let title = txtTitolo.value;
        if (!blob || !title) {
            alert("Compila tutti i campi!")
            return;
        }
        else {
            let promise = base64Convert(blob);
            promise.catch(function (err) {
                alert("Errore con la conversione da Blob a Base64: " + err);
                reject(error);
            })
            promise.then(function (base64) {
            
            })
        }
    });
    function base64Convert(blob) {
        return new Promise(function (resolve, reject) {
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = function (event) {
                resolve(event.target.result); // event.target sarebbe reader
            };
            reader.onerror = function (error) {
                reject(error);
            };
        })
    }

});

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
