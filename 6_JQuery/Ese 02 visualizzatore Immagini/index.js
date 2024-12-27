"use strict"

$(document).ready(function() {
    let index=1;
    let container=$("#container");
    let btnIndietro=$("#btnIndietro");
    let btnAvanti=$("#btnAvanti");
    let img=$("#img");
    const buttonproperties={
        "width": "140px",
        "height": "40px",
        "font-weight": "bold",
        "background-color": "orange",
        "border-radius": "50%",
        "position": "relative",
        
        "cursor": "pointer"
    }
    container.css({
        "display": "flex",
        "align-items": "center", 
        "justify-content": "center",
    })
    btnIndietro.css(buttonproperties);
    btnAvanti.css(buttonproperties);
    img.css({
        "width": "400px",
        "border": "1px solid black",
        
    })
    btnIndietro.on("click", function(){
        index--;
        if(index==1){
            btnIndietro.prop("disabled", true);
        }
        else{
            btnAvanti.prop("disabled", true);
        }
        btnAvanti.prop("disabled", false);
        img.prop("src",`./img/img${index}.jpg`)
    })
    btnAvanti.on("click", function(){
        index++;
        if(index==7){
            btnAvanti.prop("disabled", true);
        }
        else{
            btnIndietro.prop("disabled", true);
        }
        btnIndietro.prop("disabled", false);
        img.prop("src",`./img/img${index}.jpg`)
    })
    btnIndietro.prop("disabled", index === 1);

    img.prop("src",`./img/img${index}.jpg`)
});