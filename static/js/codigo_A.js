const botonR=document.querySelector(".boton-registar-alumno");
const inputNombre=document.querySelector(".input-nombre");
const inputCedula=document.querySelector(".input-cedula");
const inputEstado=document.querySelector(".input-estado");
const aseideSection=document.querySelector(".aside-section");
const btnDelete=document.getElementsByClassName("btn-delete");
const divTabla=document.querySelector(".div-tabla");

const rayas=document.querySelector(".rayas");
const aside=document.querySelector(".div-aside");

const mensajes=document.querySelector(".mensajes");
const aside2=document.querySelector(".aside");
const divAgregar=document.querySelector(".div-agregar");
const divAgregarA=document.querySelector(".div-agregar-a");
const divMensaje=document.querySelector(".div-mensaje2");
const botonEnviar=document.querySelector(".boton-enviar");
const mensaje=document.querySelector(".input-mensaje");
const avisador=document.querySelector(".avisador");

const contactos=document.querySelector(".aside");

const contacto=document.getElementsByClassName("contactos");

const modal=document.querySelector(".ventana-modal-imagenes");
const botonArchivos=document.querySelector(".boton-archivo");
const inputArchivos=document.getElementById("input-archivos");


const tbody=document.querySelector(".tbody");

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



let grupos=[{
	id:0,
	nombre:"Proyecto 2",
	foto:"../foto3.png"
},{
	id:1,
	nombre:"Proyecto 1",
	foto:"../foto1.png"
},{
	id:2,
	nombre:"Matematica 3",
	foto:"../foto2.png"
},{
	id:3,
	nombre:"Programacion 4",
	foto:"../foto3.png"
},{
	id:4,
	nombre:"Fisica 1",
	foto:"../foto4.png"
},{
	id:5,
	nombre:"Biologia",
	foto:"../foto1.png"
},{
	id:6,
	nombre:"Fisica",
	foto:"../foto3.png"
},{
	id:7,
	nombre:"Ingeneria",
	foto:"../foto4.png"
},{
	id:8,
	nombre:"Matematica",
	foto:"../foto1.png"
},{
	id:9,
	nombre:"Quimica",
	foto:"../foto3.png"
},{
	id:10,
	nombre:"Programacion 8",
	foto:"../foto4.png"

}
]


const alumnosGrupo=[{
	nombre:"Eliezer",
	cedula:"31009986",
	grupos:[0,1,3,4],
	estado:"Regular",
	email:"coreeo@gmail.com",
	role:"e",
	contrasena:"12345678",
	telefono:"04166876793"
},{
	nombre:"Ammi Fuentes",
	cedula:"31009987",
	grupos:[0,2,3,4],
	estado:"Resagada",
	email:"coreeo@gmail.com",
	role:"e",
	contrasena:"ammi",
	telefono:"04166876793"
},{
	nombre:"Aristides Fuentes",
	cedula:"9859763",
	grupos:[0,3,2],
	estado:"Regular",
	email:"coreeo@gmail.com",
	role:"e",
	contrasena:"aristides",
	telefono:"04166876793"
},{
	nombre:"Ketty Moreno",
	cedula:"11536453",
	grupos:[0,1,2,3],
	estado:"",
	email:"coreeo@gmail.com",
	role:"p",
	contrasena:"12345678",
	telefono:"04166876793"
}];



let id=8;
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

const llenarTabla=(nombre,cedula,telefono,email,estado)=>{
	
	
	tbody.innerHTML+=`<tr>
					    <td>${nombre}</td>
						<td>${cedula}</td>
						<td>${estado}</td>
						<td>${telefono}</td>
						<td>${email}</td>
						<td><a href="" class="btn btn-danger btn-delete">Borrar</a></td>
						<td><a href="" class="btn btn-primary">Editar</a></td>
					
					</tr>`

}
let indice;

for (let i = 0; i < contacto.length; i++) {
	contacto[i].addEventListener("click",function(){
		for (let b = 0; b < contacto.length; b++) {
			contacto[b].classList.remove("materia-actual");
		}
		tbody.innerHTML="";

		for (let a = 0; a < alumnosGrupo.length; a++) {
			if (alumnosGrupo[a].role!="p"){
				indice=parseInt(this.classList.item(1));

				if (alumnosGrupo[a].grupos.includes(indice)){
					llenarTabla(alumnosGrupo[a].nombre,alumnosGrupo[a].cedula,alumnosGrupo[a].telefono,alumnosGrupo[a].email,alumnosGrupo[a].estado);
				}
			}
		}

		this.style.transition="background 0.1s";
		this.classList.add("materia-actual");
		
		
	})
}





// Agregar archivos por medio de drag and drop
 
  mensajes.addEventListener('dragover', (evt)=>{
  	console.log("hola")
    modal.style.display="block";
  	evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
    

  }, false);
  mensajes.addEventListener('drop', (evt)=>{

  	evt.stopPropagation();
    evt.preventDefault();
    modal.style.display="none";

    let files = evt.dataTransfer.files;

    let output = [];
    for (let i = 0, f; f = files[i]; i++) {
      output.push( escape(f.name), f.type || 'n/a',
                  f.size,
                  f.lastModifiedDate.toLocaleDateString());
    }
    console.log("C:\\fakepath\\"+output[0]);

  }, false);


// Comprobacion de Borrar


for (let i = 0; i < btnDelete.length; i++) {
	btnDelete[i].addEventListener("click",function(e){
		if (!confirm("¿Desea Borrar Este Estudiante?")){
			e.preventDefault()
		}
	})
}
try {
	botonR.addEventListener("click",(e)=>{
	
		console.log(inputNombre.value);
		console.log(inputCedula.value);
		console.log(inputEstado.value);
	});

} catch(e) {
	
	divTabla.style.height="calc(100% - 60px - 57px)"
	
}

