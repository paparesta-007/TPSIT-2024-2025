"use strict";

window.addEventListener("load", function() {
    const content = document.getElementById("content");
    const genderElements = document.querySelectorAll(".dropdown-menu li");

    for (let genderElement of genderElements) {
        genderElement.addEventListener("click", genderClick);
    }

    const iFriends = document.getElementById("i-friends");
    iFriends.addEventListener("click", showAlert);

    const alertFriends = document.getElementById("alert-friends");
    const iSearch = document.getElementById("i-search");
    iSearch.addEventListener("click", toggleSearch);
    
    const txtSearch = document.getElementById("txt-search");
    const title = document.createElement("h3");
    content.appendChild(title);
    loadSongs("All");

    function loadSongs(gender) {
        let cont = 0;        
        if (gender === "All") {
            gender = "";
        }
        
        content.innerHTML = "";

        content.appendChild(title)
        for (const song of songs) {
            
            if (gender === "" || song[5] === gender) {
                cont++;
                
                const _mainDiv = document.createElement("div");
                _mainDiv.classList.add("row", "border", "rounded", "p-2", "m-2");
                content.appendChild(_mainDiv);
                
                const coverDiv = document.createElement("div");
                coverDiv.classList.add("col-md-4", "col-xl-3");
                _mainDiv.appendChild(coverDiv);
                
                const imgCover = document.createElement("img");
                imgCover.src = `./img/cover${song[0]}.jpg`; // Use song[0] for the ID
                imgCover.classList.add("w-100", "rounded");
                coverDiv.appendChild(imgCover);

                const _divInfo = document.createElement("div");
                _divInfo.classList.add("col-md-8", "col-xl-9");
                _mainDiv.appendChild(_divInfo);

                const hTitle = document.createElement("h2");
                hTitle.textContent = song[1]; // Use song[1] for the title
                _divInfo.appendChild(hTitle);

                const pArtist = document.createElement("p");
                pArtist.textContent = "Artist: " + song[2]; // Use song[2] for the artist
                _divInfo.appendChild(pArtist);

				const pAlbum=document.createElement("p");
				pAlbum.textContent="Album: "+song[3];
				_divInfo.appendChild(pAlbum)

				const pDuration=document.createElement("p");
				let m=Math.floor(song[4]/60);
				let s=song[4]%60;
				let sString;
				if(s<10){
					sString="0"+s;
				}
				else
					sString=s;
				pDuration.textContent="Durata: "+m+":"+sString;
				_divInfo.appendChild(pDuration);

				const pGender=document.createElement("p");
				pGender.textContent="Genere: "+song[5];
				_divInfo.appendChild(pGender)

				const pStream=document.createElement("p");
				pStream.textContent="Riproduzioni: "+song[6].toLocaleString();
				_divInfo.appendChild(pStream);

				const btnPlay=document.createElement("button");
				btnPlay.classList.add("btn","btn-secondary");
				btnPlay.textContent="Play";
				btnPlay.addEventListener("click",function(){
					const newModal = new bootstrap.Modal("#play-modal");
                    const spanArtist=document.getElementById("song-artist-modal");
                    spanArtist.textContent=song[2]; 
                    spanArtist.style.color="gray"
					const spanSong=document.getElementById("song-title-modal");
					spanSong.textContent=song[1];
                    newModal.show();
				})
				_divInfo.appendChild(btnPlay)
            }
        }
                
        title.textContent = `Numero di dischi ${gender === "" ? "" : gender}: ${cont}`;

  
    }

    function genderClick() {
        for (const li of genderElements) {
            const a = li.firstChild;
            a.classList.remove("active"); 
        }
        
        this.firstElementChild.classList.add("active");
    
        loadSongs(this.textContent);
    }
    

    function showAlert() {
        
    }

    function toggleSearch() {
       
    }
});
