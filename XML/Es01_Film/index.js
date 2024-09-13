"use strict"

const films = [
    // Id, Title, Favorite, Watch date, Rating (0-5)
    [1, "Pulp Fiction", true, "10-03-2024", 5],
    [2, "21 Grammi", true, "17-03-2024", 3],
    [3, "Star Wars", false, "15-03-2024", 1],
    [4, "Matrix", false, "01-01-2023", 4],
    [5, "Shrek", false, "21-03-2024", 2],
    [6, "Kill Bill Vol. 1", true, "22-04-2024", 5],
    [7, "Inception", true, "18-04-2024", 5]
];


//window.addEventListener("load", function () {
window.onload = function() {

    const _tbody= document.getElementsByTagName("body")[0];
    //const tbody=document.querySelector("body");
    //const tbody=document.querySelectorAll("body")[0];
    visualizza();
    function visualizza(){
        for(let i=0;i<films.length;i++){
            const riga=document.createElement("tr");
            _tbody.appendChild(riga);

            for (let j = 0; j < films[i].length; j++) {
                const td=document.createElement("td");
                td.textContent=films[i][j]
                if(j==2){
                    const chk=document.createElement("input");
                    chk.type="checkbox";
                    chk.checked;
                    chk.readOnly;
                    
                }
                else

                
                riga.appendChild(td);
                
            }
        }
    }
}