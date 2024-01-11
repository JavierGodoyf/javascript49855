//declaracion de variables
function suma(num1, num2) {
    return num1+num2
}

function resta(num1, num2) {
    return num1-num2
}

function division(num1, num2) {
    
}

function multiplicacion(num1, num2) {
    
}

function factorial(num1) {
    let result=1
    for (let i=1; i<=num1;i++)
        result=result*i
    return result
}

//inicio programa
//variables
let num1
let num2
let opcion
let result


do {
    opcion = prompt("bienvenido a la calculadora\nelige una opcion:\n1)Suma\n2)Resta\n3)dividir\n4)Multiplicar\n5)factorial de un numero\n6)Salir")
    switch (parseInt(opcion)) {
        case 1:
            num1 = parseFloat(prompt("ingrese el primer numero"))
            num2 = parseFloat(prompt("ingrese el segundo numero"))
            result=suma(num1, num2)
            alert("la suma de ambos numeros es: " + result)
            break

        case 2:
            num1 = parseFloat(prompt("ingrese el primer numero"))
            num2 = parseFloat(prompt("ingrese el segundo numero"))
            result = resta(num1,num2)
            alert("la resta de ambos numeros es: " + result)
            break

        case 3:
            num1 = parseFloat(prompt("ingrese el primer numero"))
            num2 = parseFloat(prompt("ingrese el segundo numero"))
            result = num1 / num2
            alert("la division de ambos numeros es: " + result)
            break

        case 4:
            num1 = parseFloat(prompt("ingrese el primer numero"))
            num2 = parseFloat(prompt("ingrese el segundo numero"))
            result = num1 * num2
            alert("la multiplicacion de ambos numeros es: " + result)
            break

        case 5:
            num1 = parseFloat(prompt("ingrese numero para calcular factorial"))
            result =factorial(num1)
            alert("el resultado del factorial de " + num1 + " es: " + result)
            break

        case 6:

            break

        default:
            alert("la opcion ingresada no es valida")

    }
} while (opcion != 6)