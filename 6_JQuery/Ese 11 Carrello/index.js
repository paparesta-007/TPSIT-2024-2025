window.onload = function(){
    let elencoArticoli=$("#elencoArticoli")
    let btnCarrello=$("#btnCarrello")
    let carrelloAperto=false
    let details=$(".details").css({
        "display": "none",
    })
    let i=0;
    loadPreview()

    function loadPreview(){
        elencoArticoli.html("")
        
        for (const articolo of articoli) {

            let divArticle=$("<div>",{
                "class":"article",
                "props":{
                    "id":"article-"+i,
                },
                "appendTo":elencoArticoli,
                "on":{
                    "click":function(){
                        details.slideDown(1000).html("")
                        let detailClose=$("<div></div>",{
                            "class":"detail-close",
                            "appendTo":details,
                        })
                        let span = $("<span>", {
                            "text": "X", 
                            "appendTo": detailClose,
                            "on":{
                                "click":function(){
                                    details.slideUp(1000)
                                    
                                }
                            }
                        });
                        let detailImg=$("<div>",{
                            "class": "detail-img",
                            "appendTo":details,
                        })
                        let img=$("<img>",{
                            "src":"./img/"+articolo.src+".jpg",
                            "appendTo":detailImg,
                        })
                        let detailInfo=$("<div>",{
                            "class": "detail-info",
                            "appendTo":details,
                        })
                        let h4=$("<h4>",{
                            "class":"item-title",
                            "text": articolo.nome,
                            "appendTo":detailInfo,
                        })
                        let pDescrizione=$("<p>",{
                            "text": articolo.descrizione,
                            "appendTo":detailInfo,
                        })
                        let pCosto=$("<p>",{
                            "text":"$ "+articolo.prezzo,
                            "appendTo":detailInfo,
                        })
                        let buttonAdd=$("<button>",{
                            "class": "item-add",
                            "text":"Aggiungi al carrello",
                            "appendTo": detailInfo,
                            "on":{
                                "click": function(){
                                    let carrello= $("#carrello")
                                    let tr=$("<tr>").appendTo(carrello.children("table")).prop("id",`tr-${i}`);
                                    
                                    let trFind= carrello.find(`#tr-${i}`)
                                    
                                    if(trFind.length){
                                        trFind.find("#quantita").text(parseInt(trFind.find("#quantita").text())+1)
                                    }
                                    else{
                                        
                                    }
                                    let tdNome=$("<td>",{
                                        "text": articolo.nome,
                                        "appendTo":tr
                                    })
                                    
                                    let tdPrezzo=$("<td>",{
                                        "text": "$ "+articolo.prezzo,
                                        "appendTo":tr
                                    })
                                    let tdQuantità=$("<td>",{
                                        "text":"1",
                                        "appendTo":tr
                                    })
                                    let tdCestino=$("<td>",{
                                        "css":{
                                            "background-image": "url(./img/_cestino.png)",
                                            "background-repeat": "no-repeat",
                                             "cursor": "pointer",
                                             "background-position": "center",
                                             

                                        },
                                        "appendTo":tr,
                                        "on":{
                                            "click":function(){
                                                // delete from table
                                                tr.remove()
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }
                },
            })
           
            let img=$("<img>",{
           
                "src":"./img/"+articolo.src+".jpg",
               
                "appendTo":divArticle,
                "class":"image",
                "title":"Aggiungi al carrello",
                "appendTo":divArticle,
                "on": {
                    "mouseover": function () {
                        $(this).next() .css({
                            "opacity": 1
                        });
                    },
                    "mouseout": function () {
                        $(this).next().css({
                            "opacity": 0
                        });
                    }
                }
            })
            let div = $("<div>", {
                "class": "name",
                "appendTo": divArticle,
                "text": articolo.nome,
                "css": {
                    "opacity": 0
                }
            });
            i++;
        }
    }
    btnCarrello.on("click", function(){
        if(carrelloAperto){
            carrelloAperto=false
            $("#carrello").slideUp(1000)
            btnCarrello.html("&#709; APRI CARRELLO")
        }
        else
        {
            carrelloAperto=true
            $("#carrello").slideDown(1000)
            btnCarrello.html("&#708; CHIUDI CARRELLO")
        }
    })
}
