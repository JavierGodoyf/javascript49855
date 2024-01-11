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
            result = num1 + num2
            alert("la suma de ambos numeros es: " + result)
            break

        case 2:
            num1 = parseFloat(prompt("ingrese el primer numero"))
            num2 = parseFloat(prompt("ingrese el segundo numero"))
            result = num1 - num2
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
            alert("la maultiplicacion de ambos numeros es: " + result)
            break

        case 5:

            break

        case 6:

            break

        default:

    }
} while (opcion != 6)