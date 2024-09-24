'use strict'

window.onload=function(){
    const listView = document.getElementById("list-view");
	const divNbooks = document.querySelector(".nBooks")
    const tBody = document.getElementById("tabLibri");
	
    const detailsView = document.getElementById("details-view");
	detailsView.style.display="none"
	const details = detailsView.querySelector(".details")
	const spanCount = document.querySelector(".buttons span")

    const addView = document.getElementById("add-view");
	addView.style.display="none"
	const newDetail = addView.querySelector(".details")
	
	let xml=localStorage.getItem("bookstore_xml");
	if(!xml)
	{
		xml=bookstore;	
	}
	const parser= new DOMParser;
	let xmlDOC=parser.parseFromString(xml,"text/xml");
	const xmlRoot=xmlDOC.documentElement;
	loadBooks();
	function loadBooks(){
		divNbooks.textContent="Numeri di libri: "+xmlRoot.children.length; // solo figli diretti
		let id="";
		let title="";
		let category="";
		let year="";
		let price="";
		let language="";
		let authors=""
		for (const book of xmlRoot.children) {
			if(book.hasAttribute(category)){
				category=book.category;
			}
		}
	}


}
