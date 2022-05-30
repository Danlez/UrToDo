//Variables utilizadas para almacenar la fecha
let vectorT = [];

const numFecha = document.getElementById('numFecha');
const textoFecha = document.getElementById('textoFecha');
const mesFecha = document.getElementById('mesFecha');
const yearFecha = document.getElementById('yearFecha');

const contTareas = document.getElementById('contTareas');//Almacenamiento de tareas
const nuevaTarea = event => {
    event.preventDefault();
    const { value } = event.target.textoTarea;
    if(!value) return;//si no se escribe nada, pues simplemente no pasa nada
    vectorT.push(value)
    newTarea(value)
    event.target.reset();//elimina del cuadro de texto la tarea agregada
};

const eliminar = event => {
    
    let texto = event.parentNode.parentNode.innerText.split("\n")[0];
    let a = vectorT.map(t=>t.toUpperCase()).indexOf(texto.toUpperCase());
    vectorT.splice(a,1);
    guardarTareas();
    cargarTareas()
}

const editar = event => {
    
    let texto = event.parentNode.parentNode.innerText.split("\n")[0];
    let a = vectorT.map(t=>t.toUpperCase()).indexOf(texto.toUpperCase());
    let textoNuevo = prompt("Escriba en el cuadro de texto lo que desea editar: ");
    
    if(textoNuevo.length != 0){
        vectorT[a] = textoNuevo;
        guardarTareas();
        cargarTareas();
    }
    else{
        alert("Ningún cambio fue realizado");
    }
}


//Funcion para cambiar el estado de las tareas
let estadoTarea = event => {
    event.classList.toggle('terminado');
};

function cargarTareas(){
    document.querySelector("#contTareas").innerHTML = "";
    let datos = localStorage.getItem("tarea");
    vectorT = JSON.parse(datos)||[];
    vectorT.map(newTarea)
}
function guardarTareas(){
    localStorage.setItem("tarea",JSON.stringify(vectorT));
}
function newTarea(text){
    const tarea = document.createElement('div');
    tarea.classList.add('tarea');
    contTareas.prepend(tarea);//añadir la tarea a la lista
    tarea.setAttribute("onclick","estadoTarea(this)")
    tarea.innerHTML = `
    <div class="text">${text}</div>
    <div class="opc">
        <button onclick="editar(this)" class="editarAllTarea">editar</button>
        <button onclick="eliminar(this)" class="eliminarAllTarea">eliminar</button>
    </div>
    `;
    guardarTareas();
}
cargarTareas();

// //Funcion para el almacenamiento de la fecha
const date = () => {
    const date = new Date();
    numFecha.textContent = date.toLocaleDateString('es', {day: 'numeric'});
    textoFecha.textContent = date.toLocaleDateString('en', {weekday: 'long'});
    mesFecha.textContent = date.toLocaleDateString('es', {month: 'short'});
    yearFecha.textContent = date.toLocaleDateString('es', {year: 'numeric'});
};
date(); 