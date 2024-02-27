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
// Función para obtener el tipo de clima
function obtenerTipoClima(codigoClima) {
    // Mapeo de códigos de clima a descripciones más comprensibles segun la documentacion de la api de meteoblue
    let tiposClima = {
        1: 'Cielo despejado, sin nubes',
        2: 'Cielo despejado, pocos cirros',
        3: 'Cielo despejado con cirros',
        4: 'Cielo despejado con pocas nubes bajas',
        5: 'Cielo despejado con pocas nubes bajas y pocos cirros',
        6: 'Cielo despejado con pocas nubes bajas y cirros',
        7: 'Parcialmente nublado',
        8: 'Parcialmente nublado con pocos cirros',
        9: 'Parcialmente nublado con cirros',
        10: 'Mixto con posibilidad de algunas nubes de tormenta',
        11: 'Mixto con pocos cirros y posibilidad de algunas nubes de tormenta',
        12: 'Mixto con cirros y posibilidad de algunas nubes de tormenta',
        13: 'Cielo despejado pero brumoso',
        14: 'Cielo despejado pero brumoso con pocos cirros',
        15: 'Cielo despejado pero brumoso con cirros',
        16: 'Niebla/nubes estratos bajos',
        17: 'Niebla/nubes estratos bajos con pocos cirros',
        18: 'Niebla/nubes estratos bajos con cirros',
        19: 'Mayormente nublado',
        20: 'Mayormente nublado y pocos cirros',
        21: 'Mayormente nublado y cirros',
        22: 'Nublado',
        23: 'Nublado con lluvia',
        24: 'Nublado con nieve',
        25: 'Nublado con lluvia intensa',
        26: 'Nublado con nieve intensa',
        27: 'Lluvia, probabilidad de tormentas',
        28: 'Lluvia ligera, probabilidad de tormentas',
        29: 'Tormenta con nieve intensa',
        30: 'Lluvia intensa, probabilidad de tormentas',
        31: 'Mixto con chubascos',
        32: 'Mixto con chubascos de nieve',
        33: 'Nublado con lluvia ligera',
        34: 'Nublado con nieve ligera',
        35: 'Nublado con mezcla de nieve y lluvia',
    }

    // Verificar si el código de clima existe en el mapeo
    if (tiposClima[codigoClima] !== undefined) {
        return tiposClima[codigoClima]
    } else {
        // Si no se encuentra el código de clima en el mapeo, retornar 'Desconocido'
        return 'Desconocido'
    }
}

function obtenerClima(lat, lon) {
    let apiKey = 'sSZ8dWBnLARaj5c1' // Reemplaza 'tu_api_key' con tu propia clave API
    let apiUrl = `https://my.meteoblue.com/packages/current?apikey=${apiKey}&lat=${lat}&lon=${lon}&asl=25&format=json`

    fetch(apiUrl)
        .then(respuesta => respuesta.json())
        .then(datos => {
            let temperatura = datos.data_current.temperature
            let clima = obtenerTipoClima(datos.data_current.pictocode)
            let fechaHora = new Date()
            // Obtener las partes de la fecha
            let dia = fechaHora.getDate()
            let mes = fechaHora.getMonth() + 1 // Se suma 1 porque los meses van de 0 a 11
            let año = fechaHora.getFullYear()

            // Obtener las partes de la hora
            let horas = fechaHora.getHours()
            let minutos = fechaHora.getMinutes()

            // Formatear la fecha en el formato DD/MM/YYYY
            let FechaForm = `${dia}/${mes}/${año}`

            // Formatear la hora en el formato HH:MM
            let HoraForm = `${horas < 10 ? '0' + horas : horas}:${minutos < 10 ? '0' + minutos : minutos}`
            // Mostrar la información en la interfaz de usuario
            document.getElementById('clima').innerHTML = `Temperatura: ${temperatura}°C <br>${clima}`
            document.getElementById('fecha-hora').innerHTML = `Fecha: ${FechaForm} <br>hora: ${HoraForm}`
        })
        .catch(error => {
            document.getElementById('error').innerHTML = `error al obtener datos de localizacion ${error}`


        })
}
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (posicion) {
        let latitud = posicion.coords.latitude
        let longitud = posicion.coords.longitude
        obtenerClima(latitud, longitud)
    })
} else {
    document.getElementById('error').innerHTML = 'error al obtener datos de localizacion'
}
// Cargar las tareas desde localStorage cuando la página se carga
document.addEventListener('DOMContentLoaded', cargarTareasDesdeAlmacenamiento)
