$(document).ready(function() {

    let _btnAvvia = $("#btnAvvia");
	_btnAvvia.on("click", eseguiAnimazione);
	
	function flash(){
		_btnAvvia.animate({"opacity": 0}, 450, function(){
			_btnAvvia.animate({"opacity": 1}, 450, flash);
		});
	}
	flash()
	function eseguiAnimazione(){ 
		_btnAvvia.hide();
		$("#pedina")		
		.css({"left":"10px","top":"260px", "width":"15px", "height":"15px"},)
		.animate({"left":'+=60px', "width":"8px",  "height":"8px"}, 1300,)
		.animate({"top":'+=38px',  "width":"15px", "height":"15px"},1300)
		.animate({"left":'+=116px',"width":"8px",  "height":"8px"}, 1300)
		.animate({"top":'+=77px',  "width":"15px", "height":"15px"},1300)
		.animate({"left":'+=250px',"width":"8px",  "height":"8px"}, 1300,riattiva)
		
	}
	function riattiva(){
		_btnAvvia.show();
	}
});
