const listaDeTareas = [];
function nuevaTarea(descripcion) {
    nuevaTarea.contador = (nuevaTarea.contador || 0) + 1;

    this.id = nuevaTarea.contador;
    this.descripcion = descripcion;
    this.estado = false;
    this.completar = function () {
        this.estado = !this.estado;
        if (this.estado == true)
            alert("La tarea " + this.descripcion + " ha cambiado de estado a completada");
        else
            alert("la tarea " + this.descripcion + " ha cambiado de estado a pendiente");
    }
}
function agregarTarea() {
    let descripcion = prompt("Ingresa la descripcion de la tarea");
    if (descripcion === null) {
        alert("La descripcion no puede estar vacia");
        return;
    }
    let tarea = new nuevaTarea(descripcion);
    listaDeTareas.push(tarea);
    alert("la tarea: " + tarea.descripcion + " ha sido ingresada");
}

function filtrarTareas() {
    if (listaDeTareas.length > 0) {
        let filtro = parseInt(prompt("Selecciona el filtro:\n1) Tareas completadas\n2) Tareas pendientes"));

        switch (filtro) {
            case 1:
                let tareasCompletadas = listaDeTareas.filter(tarea => tarea.estado);
                if (tareasCompletadas.length > 0) {
                    alert("Tareas completadas en consola")
                    console.log("Tareas completadas:");
                    console.table(tareasCompletadas);
                } else {
                    alert("No hay tareas completadas");
                }
                break;
            case 2:
                let tareasPendientes = listaDeTareas.filter(tarea => !tarea.estado);
                if (tareasPendientes.length > 0) {
                    alert("Tareas pendientes en consola");
                    console.log("Tareas pendientes:");
                    console.table(tareasPendientes);
                } else {
                    alert("No hay tareas pendientes");
                }
                break;
            default:
                alert("La opción ingresada no es válida");
        }
    } else {
        alert("No hay tareas en la lista de tareas");
    }
}

function completarTareaPorId(id) {
    let indice = listaDeTareas.findIndex(function (tarea) {
        return tarea.id === id;
    });

    if (indice !== -1) {
        let tareaEncontrada = listaDeTareas[indice];
        tareaEncontrada.completar();
    } else {
        alert("No se encontró ninguna tarea con el ID: " + id);
    }
}

let opc
do {
    opc = parseInt(prompt("Bienvenido al Gestor de tareas \n\nLas listas de tarea aparecen en consola\n\n\n1)Ingresa una tarea\n2)cambiar estado de tarea\n3)filtrar tareas\n4)Salir"));
    switch (opc) {
        case 1:
            agregarTarea();
            break;
        case 2:
            if (listaDeTareas.length > 0) {
                console.table(listaDeTareas);
                let id = parseInt(prompt("ingrese el ID de la tarea a cambiar"));
                if (isNaN(id)) {
                    alert("valor no admitido");
                } else {
                    completarTareaPorId(id);
                }
            } else {
                alert("no hay tareas en la lista");
            }
            break;
        case 3:
            filtrarTareas();
            break;
        case 4:
            alert("Gracias por usar el gestor de tareas");
            console.log("Programa terminado");
            break;
        default:
            alert("La opcion ingresa no es valida");
    }
} while (opc != 4);