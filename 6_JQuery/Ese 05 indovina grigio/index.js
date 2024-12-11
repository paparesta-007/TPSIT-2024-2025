"use strict";

window.onload = function(){
    const wrapper=$("#wrapper");
    const toolTip=$("#tooltip");
    const txtPosizione=$("#txtPosizione");
    const txtColore=$("#txtColore");


    $("#btnOk").on("click", function () {
        const posizione = parseInt(txtPosizione.val());
        const colore = parseInt(txtColore.val());

        if (!isNaN(posizione) && !isNaN(colore) && posizione >= 0 && posizione < 10 &&  colore >= 0 && colore <= 255) {
            let div = wrapper.children("div").eq(posizione);
            let itemColor=div.css("background-color");
            console.log(itemColor);
            let userColor=`rgb(${colore}, ${colore}, ${colore})`
            if(itemColor==userColor){
                console.log(userColor);
                alert("Hai indovinato")
            }
            else{
                let val=div.prop("colorDiv");
                val=parseInt(val);
                
                if(val<colore){
                    alert("Metti valore più basso")
                }
                else{
                    alert("Metti valore più alto")
                }
            }
        } else {
            alert("Devi inserire una posizione valida (0-9) e un colore valido (0-255).");
        }
    });
    wrapper.css({backgroundColor:"#ffa", float:"left"});
    toolTip.hide()

    creaDiv()
    function creaDiv() {
        for(let i=0; i<10; i++) {
            
            let grigio=random(0,256);
            let color=`rgb(${grigio}, ${grigio}, ${grigio})`

            let div= $("<div>",{
                "class":"box",
                "appendTo":wrapper,
                "css":{
                    "backgroundColor":color
                },
                "prop":{
                    "colorDiv":grigio
                },
                "text": i,
                "on":{
                    "mouseover" : function(){
                        toolTip.text(color).stop(true).fadeIn(1000);
                        toolTip.show();
                    },
                    "mouseout" : function(){
                        toolTip.hide().stop(true).fadeOut(1000);
                    }
                }
            })


        }
    }
}

function random(min,max) {
    return Math.floor((max-min)*Math.random())+min;
}

