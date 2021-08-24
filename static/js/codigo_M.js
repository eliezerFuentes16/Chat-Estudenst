const aseideSection=document.querySelector(".aside-section");
const tbody=document.querySelector(".tbody");
const agregarImagenMateria=document.querySelector("#agregar-imagen-materia");
const inputFoto=document.querySelector("#input-foto-materia");
const divTabla=document.querySelector(".div-tabla");
const btnDelete=document.getElementsByClassName("btn-delete");

const imagen=document.querySelector("#imagen");
const ul=document.querySelector(".ul");
const h3=document.querySelector(".h3");


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

try {
	agregarImagenMateria.addEventListener("click",()=>{
		inputFoto.click();
	});
} catch(e) {
	divTabla.style.height="calc(100% - 57px - 61px)"
	
}




aseideSection.addEventListener("click",(e)=>{
	ul.style.display="none";
	menuPerfil=false

});

const agregarImagen=document.querySelector("#agregar-imagen-materia");
const inputImagenM=document.querySelector("#input-foto-materia");
try {
	agregarImagen.addEventListener('dragover', (e)=>{
    e.preventDefault();
  	
    h3.style.color="#ccc";
  	agregarImagen.style.background="#777"
  	agregarImagen.style.border="2px dashed #fff"
    
    

 });

} catch(e) {
	// statements
	console.log(e);
}


let grupos=[
]



const llenarTabla=(nombre,foto,Alumnos,idMateria)=>{


	tbody.innerHTML+=`<tr>
					    <td>${nombre}</td>
						<td>${Alumnos}</td>
						<th><div class="foto-materia"><img src="${foto}"></div></th>
						<td><a href="verEstudiantes.html" class="btn btn-primary">Estudiantes +</a></td>
					</tr>`

}


for (let i = 0; i < btnDelete.length; i++) {
	btnDelete[i].addEventListener("click",function(e){
		if (!confirm("¿Desea Borrar Esta Materia?")){
			e.preventDefault()
		}
	})
}
		
		
