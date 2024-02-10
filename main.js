const listaDeTareas = [] //Array para almacenar tareas

function guardarTareasEnAlmacenamiento() {
    localStorage.setItem('tareas', JSON.stringify(listaDeTareas))
}

function cargarTareasDesdeAlmacenamiento() {
    let tareas = JSON.parse(localStorage.getItem('tareas')) || []
    tareas.forEach(tarea => {
        let nuevaTareaItem = document.createElement('li')
        nuevaTareaItem.className = 'list-group-item d-flex justify-content-between align-items-center'
        nuevaTareaItem.innerHTML = `
            <span>${tarea.descripcion}</span>
            <div>
                <button class="btn btn-success btn-sm boton-completar-tarea" ${tarea.estado ? 'disabled' : ''}>Completar</button>
                <button class="btn btn-danger btn-sm boton-eliminar-tarea">X</button>
            </div>
        `
        if (tarea.estado) {
            nuevaTareaItem.querySelector('span').classList.add('text-success')
            nuevaTareaItem.querySelector('span').classList.add('fw-bold')
        }
        document.getElementById('listaTareasDOM').appendChild(nuevaTareaItem)
        listaDeTareas.push(tarea)
    })
}

function crearNuevaTarea(descripcion) { //funcion constructora
    crearNuevaTarea.contador = (crearNuevaTarea.contador || 0) + 1
    this.id = crearNuevaTarea.contador
    this.descripcion = descripcion
    this.estado = false
}

function agregarTarea() { //funcion para agregar tareas nuevas
    let descripcion = document.getElementById('nuevaTareaInput').value.trim()
    if (descripcion === '') {
        Toastify({
            text: "El cuadro de texto no puede estar vacío",
            duration: 3000,
            style: {
                background: "linear-gradient(to right, #df1b1b, #ba3030)",
            }
        }).showToast()
        return
    }
    let tarea = new crearNuevaTarea(descripcion)
    listaDeTareas.push(tarea)

    // Crear un nuevo elemento de lista en el DOM
    let tareaList = document.getElementById('listaTareasDOM')
    let nuevaTareaItem = document.createElement('li')
    nuevaTareaItem.className = 'list-group-item d-flex justify-content-between align-items-center'
    nuevaTareaItem.innerHTML = `
        <span>${tarea.descripcion}</span>
        <div>
            <button class="btn btn-success btn-sm boton-completar-tarea">Completar</button>
            <button class="btn btn-danger btn-sm boton-eliminar-tarea">X</button>
        </div>
    `
    tareaList.appendChild(nuevaTareaItem)

    // Limpiar el campo de entrada después de agregar la tarea
    document.getElementById('nuevaTareaInput').value = ''

    // Guardar las tareas en localStorage
    guardarTareasEnAlmacenamiento()
    Toastify({
        text: "La tarea fue añadida exitosamente",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #008f39, #008f39)",
        }
    }).showToast()
}

function eliminarTarea(evento) {
    let listItem = evento.target.closest('.list-group-item')
    if (listItem) {
        let index = Array.from(listItem.parentNode.children).indexOf(listItem)
        listaDeTareas.splice(index, 1)
        listItem.remove()
        Toastify({
            text: "La tarea seleccionada fue eliminada",
            duration: 3000,
            style: {
                background: "linear-gradient(to right, #df1b1b, #ba3030)",
            }
        }).showToast()
    }

    // Guardar las tareas en localStorage después de eliminar una tarea
    guardarTareasEnAlmacenamiento()
}

// Función para completar una tarea
function completarTarea(evento) {
    let listItem = evento.target.closest('.list-group-item')
    if (listItem) {
        let index = Array.from(listItem.parentNode.children).indexOf(listItem)
        let tarea = listaDeTareas[index]
        tarea.estado = true
        listItem.querySelector('.boton-completar-tarea').disabled = true // Deshabilitar el botón de completar
        listItem.querySelector('span').classList.add('text-success') // Aplicar estilo de verde al texto
        listItem.querySelector('span').classList.add('fw-bold') // Aplicar estilo Negrita al texto 
        Toastify({
            text: "La tarea se ha completado exitosamente",
            duration: 3000,
            style: {
                background: "linear-gradient(to right, #008f39, #008f39)",
            }
        }).showToast()
    }
    // Guardar las tareas en localStorage después de completar una tarea
    guardarTareasEnAlmacenamiento()
}

function filtrarTareas(estado) {
    return listaDeTareas.filter(tarea => {
        if (estado === 'pendientes') {
            return !tarea.estado //devuelve las que estan con estado false
        } else if (estado === 'completadas') {
            return tarea.estado //devuelve las que estan con estado true
        } else {
            return true //con el true devolvera indepndiente del estado
        }
    })
}

function mostrarTareasFiltradas(estado) {
    let tareaList = document.getElementById('listaTareasDOM')
    tareaList.innerHTML = '' // Limpiar la lista antes de mostrar las tareas filtradas
    let tareasFiltradas = filtrarTareas(estado)
    tareasFiltradas.forEach(tarea => {
        let nuevaTareaItem = document.createElement('li')
        nuevaTareaItem.className = 'list-group-item d-flex justify-content-between align-items-center'
        nuevaTareaItem.innerHTML = `
            <span>${tarea.descripcion}</span>
            <div>
                <button class="btn btn-success btn-sm boton-completar-tarea" ${tarea.estado ? 'disabled' : ''}>Completar</button>
                <button class="btn btn-danger btn-sm boton-eliminar-tarea">X</button>
            </div>
        `
        if (tarea.estado) { //cambio de color si la tarea esta completada
            nuevaTareaItem.querySelector('span').classList.add('text-success')
            nuevaTareaItem.querySelector('span').classList.add('fw-bold')
        }
        tareaList.appendChild(nuevaTareaItem)
    })
}

document.getElementById('nuevaTareaBtn').addEventListener('click', agregarTarea)
document.getElementById('listaTareasDOM').addEventListener('click', function (evento) {
    if (evento.target.classList.contains('boton-eliminar-tarea')) {
        eliminarTarea(evento)
    }
})
document.getElementById('listaTareasDOM').addEventListener('click', function (evento) {
    if (evento.target.classList.contains('boton-completar-tarea')) {
        completarTarea(evento)
    }
})
document.querySelectorAll('.btn-group .btn').forEach(btn => {
    btn.addEventListener('click', function () {
        let filtrado = this.getAttribute('data-filter')
        mostrarTareasFiltradas(filtrado)
    })
})
// Cargar las tareas desde localStorage cuando la página se carga
document.addEventListener('DOMContentLoaded', cargarTareasDesdeAlmacenamiento)
