


const rayas=document.querySelector(".rayas");
const aside=document.querySelector(".div-aside");


const imagen=document.querySelector("#imagen");
const ul=document.querySelector(".ul");
let menuPerfil=false;

imagen.addEventListener("click",(e)=>{
	if (!menuPerfil){
		ul.style.display="block";
		menuPerfil=true
	}else{
		ul.style.display="none";
		menuPerfil=false
	}

});

aseideSection.addEventListener("click",(e)=>{
	ul.style.display="none";
	menuPerfil=false

});


rayas.setAttribute("title","Ver Grupos")

let abierto=false;		
let usuario=true;
let idUsuario=1;

rayas.addEventListener("click",(e)=>{
	
	if (abierto==false){
		aside.style.width = "280px";
		divAgregar.style.width = "260px";
		divAgregarA.style.width = "250px";
		mensajes.style.width = "calc(100% - 280px)";
		aside.style.visibily="none";
		aside2.style.display="block";
		divAgregarA.style.visibility="visible";
		
		abierto=true;
		rayas.setAttribute("title","Cerrar Grupos")
	}else{
		aside.style.width = "0";
		divAgregar.style.width = "0px";
		
		mensajes.style.width = "100%";
		
		abierto=false;
		rayas.setAttribute("title","Ver Grupos")

	}
	


});

