/* function saludo(nombre) {
    
    tarea = document.write(`Hola ${nombre}, bienvenido a la web` + "</br>");
    
    return tarea;
}

let nombre_usuario = prompt("Introduce tu nombre");
saludo(nombre_usuario);
saludo("Rafael"); */

/* function suma(op1, op2) {
    return op1 + op2;
}

let resultado_suma = suma(4, 20);
document.write(resultado_suma); */

/* function calculo_comision(ventas, antiguedad, zona) {
    let comision = 0;
    if(ventas > 1000) comision = (ventas * 15) / 100;
    if(antiguedad > 5) comision += 100;
    if(zona == "norte") comision += 50;
    if(zona == "sur") comision += 60;

    return comision;
}

let total_ventas = prompt("Introduce las ventas de este mes");
let ant_empres = prompt("Introduce la antiguedad en la empresa");
let zona_ventas = prompt("Introduce tu zona de trabajo");

document.write("La comision de este mes es: " + calculo_comision(total_ventas, ant_empres, zona_ventas)); */

/* function factorial(numero) {
    let resultado = 1;
    if(numero <= 1) return 1;
    else {
        for(let i = 1; i <= numero; i++) {   
            resultado*=i;
        }
    }
    return resultado;
} */
// Misma funcion que la anterior pero con recursividad (una funciona llamandose a si misma dentro)
/* const factorial = function calculo_factorial(num) {if(num <= 1) return 1; else return num*calculo_factorial(num - 1);};
document.write(factorial(5)); */

// Arrow functions
/* const area_cuadrado = (lado) => {return lado * lado;};
document.write(area_cuadrado(5));

const area_triangulo = (base, altura) => { return (base * altura) / 2};
document.write(area_triangulo(5, 4)); */

// Arrow functions simplificadas
/* const area_cuadrado_optimizada = lado => lado * lado;
const area_triangulo_optimizada = (base, altura) => (base * altura) / 2;

document.write(area_cuadrado_optimizada(5));
document.write(area_triangulo_optimizada(5, 4)); */

// Anidamiento de funciones
// Teorema de pitagoras --> c = raiz cuadrada de a2 + b2

/* const calculo_hipotenusa = (a, b) => {
    let suma_catetos = Math.pow(a, 2) + Math.pow(b, 2); 
    return Math.sqrt(suma_catetos);
};

let a = prompt("Introduce la longitudo del Cateto A");
let b = prompt("Introduce la longitudo del Cateto B");

document.write(calculo_hipotenusa(a, b)); */

const calculo_hipotenusa = (a, b) => {
    const cuadrado_cateto = cateto => Math.pow(cateto, 2);
    return Math.sqrt(cuadrado_cateto(a) + cuadrado_cateto(b));
};

let a = prompt("Introduce la longitudo del Cateto A");
let b = prompt("Introduce la longitudo del Cateto B");

document.write(calculo_hipotenusa(a, b));