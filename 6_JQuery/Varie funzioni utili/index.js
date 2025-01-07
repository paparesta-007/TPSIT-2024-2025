window.onload = function(){
    let aperto=true;
    let divRotate = $(".rotate")
    let btnApri=$("#btnApri")
    let contenitore=$(".contenitore")
    rotazione()
   
    // cambiaOpacity()
    function rotazione(){
        divRotate.animate({"left":"100px"},500)
        .animate({"top":"100px"},500)
        .animate({"left":"0px"},500)
        .animate({"top":"0px"},500, rotazione)

        
    }
    function cambiaOpacity() {
        divRotate.animate({ "opacity": "0" }, 500,)
            .animate({ "opacity": "1" }, 500, cambiaOpacity);
    }

    btnApri.on("click", function(){
        if(aperto) {
            btnApri.text("Apri")
            contenitore.fadeOut(400)
        }else{
            btnApri.text("Chiudi")
            contenitore.slideDown(400)
        }
        aperto=!aperto
    })
    
    let button2=btnApri.clone() // senza niente non clona eventi
    let button3=btnApri.clone(true) //se è true clona anche eventi

    let body=$("body")
    body.append(button2)
    body.append(button3)

    button2.text("Clone buttone apri (non ha eventi)")
    button3.text("Clone buttone chiudi (ha eventi)")

    let h4=$("<h4>",{
        "text":"Lista creata dinamicamente",
        "appendTo":body,
        "css":{
            "margin-top":30
        }
    })
    let ul=$("<ul>",{
        "appendTo":body,
        "css":{
            "margin":0
        }
    })

    for(let i=0;i<5;i++){
        let li=$("<li>",{
            // "text":"item n° "+i,
            "appendTo":ul,
            "class":"liDinamicamente",
            "css":{
                "list-style-type":"square"
            },
            "prop":{
                "data-index":i+1,
                "data-testo":"Questo testo è preso dalle prop n° "+i,
            }
            
        })
        li.text(li.prop("data-testo"))
        if(i%2==0){
            animateLiOdd()
        }
        else{
            animateLiEven()
        }
        
        function animateLiEven(){
            li.animate({"opacity":"0"},1000)
            .animate({"opacity":"1"},1000,animateLiEven)
        }
        
        function animateLiOdd(){
            li.animate({"opacity":"1"},1000)
            .animate({"opacity":"0"},1000,animateLiOdd)
        }
    }
    let button4=$("<button>",{
        "text":"Sono appeso prima dell'ul (before o insertBefore)",
        
    })
    // body.append(button4) // Lo appenderebbe alla fine
    button4.insertBefore(ul)  //parametro è elemento su cui viene appeso prima
    // ul.before(button4) //analogo a quello di prima ma parametro è l'elemento da appendere
    

    ////////////////////
    let btnAggiungi = $("#btnAggiungi");
    let btnElimina=$("#btnElimina");
    let spanContafigli = $("#spanContafigli");
    let contenitoreConFigli = $(".contenitoreConFigli");
    btnElimina.on("click",function() {
        let divDaEliminare = $(".contenitoreConFigli div:last-child");
        divDaEliminare.remove();
        if (contenitoreConFigli.children().length > 0) {
            spanContafigli.text("Ci sono " + contenitoreConFigli.children().length + " div");
        } else {
            spanContafigli.text(" Il contenitore sotto non ha figli");
        }
    })

    btnAggiungi.on("click", function() {
        

        let div = $("<div>", {
            "css": {
                "border": "1px solid black",
                "background": "red",
                "height": "50px",
                "width": "50px",
            },
            "appendTo": contenitoreConFigli
        });

      

        if (contenitoreConFigli.children().length > 0) {
            spanContafigli.text("Ci sono " + contenitoreConFigli.children().length + " div");
        } else {
            spanContafigli.text(" Il contenitore sotto non ha figli");
        }
    });

}