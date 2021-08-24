const aseideSection=document.querySelector(".aside-section");

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