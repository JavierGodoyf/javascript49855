//declaracion de funciones
function suma(num1, num2) {
    return num1+num2
}

function resta(num1, num2) {
    return num1-num2
}

function factorial(num1) {
    let result=1
    for (let i=1; i<=num1;i++)
        result=result*i
    return result
}
function Nfibonacci(num){
    if (num <=0){
        alert("el valor ingresado no es valido")
    }else if (num === 1 || num === 2)
        alert("la posicion " + num + " es: 1")
    else{
        let a = 1
        let b = 1
        for(let i=3; i <= num; i++){
                let aux = a+b
                a = b
                b = aux
        }
        alert("la posicion " + num + " es: " + b)
    }
}
//inicio programa
//variables
let num1
let num2
let opcion
let result


do { //utilizando bucle do-while
    opcion = prompt("bienvenido a la calculadora\n\nelige una opcion:\n1)Suma\n2)Resta\n3)dividir\n4)Multiplicar\n5)factorial de un numero\n6)consultar posicion de sucesion fibonacci\n7)Salir")
    switch (parseInt(opcion)) {
        case 1:
            num1 = parseFloat(prompt("ingrese el primer numero"))
            num2 = parseFloat(prompt("ingrese el segundo numero"))
            result=suma(num1, num2) //usando funciones declaradas
            alert("la suma de ambos numeros es: " + result)
            break

        case 2:
            num1 = parseFloat(prompt("ingrese el primer numero"))
            num2 = parseFloat(prompt("ingrese el segundo numero"))
            result = resta(num1,num2) //usando funciones declaradas
            alert("la resta de ambos numeros es: " + result)
            break

        case 3:
            num1 = parseFloat(prompt("ingrese el dividendo"));
            num2 = parseFloat(prompt("ingrese el divisor"));
            if(num2!==0){
            result = ((dividendo, divisor) => dividendo / divisor)(num1, num2);  //  utilizando funcion flecha
            alert("la division de ambos numeros es: " + result);
            }else{
                alert("No se puede dividir por 0")
            }
            break;

        case 4:
            num1 = parseFloat(prompt("ingrese el primer numero"))
            num2 = parseFloat(prompt("ingrese el segundo numero"))
            result =(function (multi1, multi2) { // utilizando funcion anonima
                return multi1*multi2
            })(num1,num2)
            alert("la multiplicacion de ambos numeros es: " + result)
            break

        case 5:
            num1 = parseFloat(prompt("ingrese numero para calcular factorial"))
            result =factorial(num1) //usando funcion declarada con bucle for
            alert("el resultado del factorial de " + num1 + " es: " + result)
            break
        
        case 6:
            num1 = parseFloat(prompt("ingrese el numero fibonacci a consultar"))
                Nfibonacci(num1);
            break

        case 7:
            console.log("Terminar simulador")
            break

        default:
            alert("la opcion ingresada no es valida")

    }
} while (opcion != 7) //en caso que la opcion ingresada sea 6 el programa termina