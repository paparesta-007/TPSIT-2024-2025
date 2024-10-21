'use strict'

window.onload=function(){
    const listView = document.getElementById("list-view");
	const divNbooks = document.querySelector(".nBooks")
    const tBody = document.getElementById("tabLibri");
	
    const detailsView = document.getElementById("details-view");
	detailsView.style.display="none";
	const details = detailsView.querySelector(".details")
	const spanCount = document.querySelector(".buttons span")

    const addView = document.getElementById("add-view");
	addView.style.display="none";
	const newDetail = addView.querySelector(".details")
	
	let xml = localStorage.getItem("bookstore_xml");
	if(!xml)
	{
		xml = bookstore;
	}

	const parser = new DOMParser;
	const xmlDOC = parser.parseFromString(xml, "text/xml");
	//const xmlRoot = xmlDOC.documentElement;
	const xmlRoot = xmlDOC.firstElementChild;

	loadBooks();

	function loadBooks(){
		divNbooks.textContent = "Numero di libri: " + xmlRoot.children.length;  //solo figli diretti

		for (const book of xmlRoot.children) {
      readBook(book);
		}
	}
  function readBook(book){
    let id = "";
    let category = "";
    let title = "";
    let year = "";
    let price = "";
    let lang = "";
    let authors = "";

    if(book.hasAttribute(category))
    {
      category = book.getAttribute(category);
    }

    //supponiamo che id sia sempre il primo campo
    id = book.firstElementChild.textContent;

    //supponiamo che title sia sempre il secondo campo
    const titleNode = book.children[1];
    title = titleNode.textContent;

    const yearNode = book.querySelector("year");
    if(yearNode)
      year = yearNode.innerHTML;

    const priceNode = book.querySelector("price");
    if(priceNode)
      price = priceNode.innerHTML;

    if(titleNode.hasAttribute("lang"))
      lang = titleNode.getAttribute("lang");

    const authorNodes = book.querySelectorAll("author");
    
    for (const authorNode of authorNodes) {
      //if(authors != "")
        //authors += " - ";
      authors += authorNode.textContent + " - ";
    }

    if(authors != "")
      authors = authors.substring(0, authors.length - 3);
    
    console.log(authors);
  }


}
