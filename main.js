function tarea(descripcion, fecha, hora) {
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.hora = hora;
    this.estado = false;
    this.completar = function () {
        this.estado = true;
        alert("La tarea " + this.descripcion + " ha sido completada");
    }
}
const tareas = []
do {
    let opc = parseInt(prompt("Bienvenido al Gestor de tareas\n1)Ingresa una tarea\n2)Consultar tareas ingresadas\n3)Modificar tareas\n4)Salir"));
    switch (opc) {
        case 1:
            break;
        case 2:
            alert("Las tareas ingresadas son las siguiente: ");
            break;
        case 3:
            break;
        case 4:
            console.log("Programa terminado");
            break;
        default:
            alert("La opcion ingresa no es valida");
    }
} while (opc == 4)