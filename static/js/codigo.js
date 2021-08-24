const rayas=document.querySelector(".rayas");
const aside=document.querySelector(".div-aside");
const section=document.querySelector(".div-section");
const mensajes=document.querySelector(".mensajes");
const aside2=document.querySelector(".aside");

const divMensaje=document.querySelector(".div-mensaje2");
const botonEnviar=document.querySelector(".boton-enviar");
const mensaje=document.querySelector(".input-mensaje");

const boton1=document.querySelector("#Button");

const contactos=document.querySelector(".aside");
let contacto=document.getElementsByClassName("contactos");

const modal=document.querySelector(".ventana-modal-imagenes");
const botonArchivos=document.querySelector(".boton-archivo");
const inputArchivos=document.getElementById("input-archivos");

const fotoUsuario=document.querySelector(".imagen-usuario");
const ul=document.querySelector(".ul");
const aseideSection=document.querySelector(".aside-section");

const boton=document.querySelector("#Button");
const input=document.querySelector("#myMessage");
		
//socket.emit("message","Hello")


let menuPerfil=false;

boton1.addEventListener("click",(e)=>{

	if (inputArchivos.value!=""){
		divMensaje.innerHTML+=`<div class="mensajes-usuario">
					<p><img src="foto.png" alt=""></p>
				</div>`;
		console.log("foto")

	}

})

const imagen=document.querySelector("#imagen");
mensajes.scrollTop=1000000;
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

botonArchivos.addEventListener('click', function() {
    inputArchivos.click();

    console.log("pso")
    
    	// botonArchivos.style.transform="rotate(45deg)"
    
})
rayas.setAttribute("title","Abrir Menu")

let abierto=false;		
let usuario=true;
let idUsuario=1;

rayas.addEventListener("click",(e)=>{
	if (abierto==false){
		aside.style.width = "280px";
		section.style.width = "calc(100% - 280px)";
		mensajes.style.width = "calc(100% - 280px)";
		aside2.style.display="block";
		// rayas.style.transform = 'rotate(45deg)'
		abierto=true;
		rayas.setAttribute("title","Cerrar Menu");

	}else{
		aside.style.width = "0";
		section.style.width = "100%";
		mensajes.style.width = "100%";
		abierto=false;
		rayas.setAttribute("title","Abrir Menu")
		//rayas.style.transform = 'rotate(0deg)'
	}
});

mensaje.addEventListener("keypress",(e)=>{
	if (e.keyCode==13){
		e.preventDefault();
		valor=input.value;

		if (valor){
			console.log(valor)
			socket.send(valor,1)
			input.value="";
			mensajes.scrollTop=1000000;
		}

		
	}
})


let grupos=[
	
]

const llenarMensajes=(texto,propietario,usuario,role)=>{
	
	if(propietario=="u"){
	divMensaje.innerHTML+=`<div class="mensajes-usuario">
					<p class="texto-mensaje">${texto}</p> 
				</div>`;
				
	}else{
		divMensaje.innerHTML+=`<div class="mensajes-amigos"> 
					<p class="nombre-mensaje">${usuario}</p>
					<p class="texto-mensaje">${texto}</p> 
				</div>`;
				
	}
	
	mensajes.scrollTop=1000000;

};

let id;
fetch("/ide").then(e=>e.json()).then(res=>{
	console.log(res,"id")
	id=res;

})

let divColor;
for (let i = 0; i < grupos.length; i++){
	
	
	divColor=`<div class="contactos ${grupos[i].id}">`;
	
	contactos.innerHTML+=`<hr> 
		${divColor}
		<h3>${grupos[i].nombre}</h3>
		<div class="foto-contacto"><img src="${grupos[i].foto}"></div>
		</div>
	`;
}

let propietario;

contacto=document.getElementsByClassName("contactos");
for (let i = 0; i < contacto.length; i++) {
	if (i==0){
		contacto[i].classList.add("contacto-actual")
	}
	contacto[i].addEventListener("click",function(){
		if (!this.classList.contains("contacto-actual")){
			
			idGrupos=this.classList.item(1);
			for (let b=0; b < contacto.length; b++) 
			{
				contacto[b].classList.remove("contacto-actual");
			}
			
			this.style.transition="background 0.05s";
			this.classList.add("contacto-actual");
			console.log(idGrupos)
			fetch(`/api/index/${idGrupos}`).then(res=>res.json()).then(res=>{
				console.log(res)
				divMensaje.innerHTML=""	
				for (let i = 0; i < res.length; i++) {
					if (res[i][1]==id){
						propietario="u"
					}else{
						propietario="a"
					}

					if (res[i][5]=="p"){
						role="Profesor(a) "
					}else{
						role=""
					}

					llenarMensajes(res[i][2],propietario,res[i][4],role)
				}
			});

		}
				
	})
}

