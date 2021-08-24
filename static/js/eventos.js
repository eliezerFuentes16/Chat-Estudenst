
const socket=io();

const boton2=document.querySelector(".Button");
const input2=document.querySelector(".myMessage");
const mensajes2=document.querySelector(".mensajeria");
//socket.emit("message","Hello")
divMensaje3=document.querySelector(".div-mensaje3");



fetch("/ide").then(e=>e.text()).then(res=>{
	console.log(res,"id")
	id=res;

})

contacto=document.getElementsByClassName("contactos");
for (let i = 0; i < contacto.length; i++) {
	if (contacto[i].classList.contains("contacto-actual")){

		idGrupos=contacto[i].classList.item(1);
	}
}
		
socket.on("message",(msg)=>{
	console.log(msg)
	if (msg[1]==id){
		divMensaje3.innerHTML+=`<div class="mensajes-usuario">
			<p class="texto-mensaje texto-mensaje-usuario">${msg[0]}</p> 
				</div>`;
						
	}else{
		divMensaje3.innerHTML+=`<div class="mensajes-amigos"> 
				<p class="nombre-mensaje">${msg[1]}</p>
				<p class="texto-mensaje texto-mensaje-amigos">${msg[0]}</p> 
				</div>`;
						
	}

})


let valor;
boton2.addEventListener("click",()=>{
	console.log(idGrupos)
	valor=input2.value;
	if (valor){
		socket.send(valor,idGrupos)
		input2.value="";
		mensajes2.scrollTop=1000000;
	}
})

mensaje.addEventListener("keypress",(e)=>{
	if (e.keyCode==13){
		e.preventDefault();
		valor=input.value;

		if (valor){
			console.log(valor)
			socket.send(valor,idGrupos)
			input.value="";
			mensajes2.scrollTop=1000000;
		}

		
	}
})