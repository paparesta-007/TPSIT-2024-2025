"use strict"
var utenti = [ {"user":"pippo",  "pwd":"pwd1Pippo"},
               {"user":"pluto",  "pwd":"pwd1Pluto"},
			   {"user":"minnie", "pwd":"pwd1Minnie"} ];
let index=-1;
$(document).ready(function() {
    let txtUser = $("#txtUser");
    let txtPwd=$("#txtPwd");
    txtUser.val("");
    let msgUtente=$("#msgUser").hide()
    let msgPwd=$("#msgPwd").hide();
    txtUser.on("change", function() {
        console.log("click");
        if (txtUser.val() == "") { 
            alert("Enter something");
        }
        else{
            let trovato=false;
            for(let utente of utenti) {
                if(utente.user == txtUser.val()){
                    index = utenti.indexOf(utente);
                    trovato=true;
                    break
                }
            }
            if(!trovato){ 
                txtUser.css({"border": "1px solid red"})
                msgUtente.hide().fadeIn().text("utente non trovato").css({"color": "red"})
                
            }
            else{

                txtUser.css({"border": "1px solid green"})
                msgUtente.hide().fadeIn().text("utente trovato").css({"color": "green"})
            }
        }
        txtPwd.trigger("change");
    });
    txtPwd.on("change",function(){
        if(txtPwd.val()){
            let trovato=false;
                if(utenti[index].pwd == txtPwd.val()){
                    trovato=true;
                    // break
                }

            
            if(!trovato){ 
                txtPwd.css({"border": "1px solid red"})
                msgPwd.hide().fadeIn().text("passowrd errata").css({"color": "red"})
            }
            else{

                txtPwd.css({"border": "1px solid green"})
                msgPwd.hide().fadeIn().text("password corretta").css({"color": "green"})
            }
        }
        txtUser.trigger("change");
    })
    txtPwd.on("mouseover",function(){
        txtPwd.css({
            "border": "1px solid blue",
            "background-color": "#ccf",
            "cursor": "pointer"
        })
    })
    txtPwd.on("mouseout",function(){
        txtPwd.css({
            "border": "",
            "background-color": "",
        })
    })
    txtUser.on("mouseover",function(){
        txtUser.css({
            "border": "1px solid blue",
            "background-color": "#ccf",
            "cursor": "pointer"
        })
    })
    txtUser.on("mouseout",function(){
        txtUser.css({
            "border": "",
            "background-color": "",
        })
    })
});