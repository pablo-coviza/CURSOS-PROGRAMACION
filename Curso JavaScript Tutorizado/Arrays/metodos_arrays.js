// Funcion forEach() a la cual se le puede pasar funcion como parametro
let numeros = [5, 10, 15, 20, 25];
let resultado_suma = 0;
//Forma 1
/* function sumando(valor) {
    resultado_suma += valor;
}
numeros.forEach(sumando); */

//Forma 2
/* numeros.forEach(function(valor) {
    resultado_suma += valor;
}); */

//Forma 3
/* numeros.forEach((valor) => {
    resultado_suma += valor;
})

document.write(resultado_suma); */

// Se le pueden pasar 3 parametros
/* numeros.forEach(function(valor, indice, elemento) {
    elemento[indice] = valor;
})

document.write(numeros); */

// Metodo map() Devuelve un array con el resultado de lo que le hayamos pasado
/* function raiz_valores(valor) {
    return Math.sqrt(valor);
}
document.write(numeros.map(raiz_valores));
console.log(numeros.map(raiz_valores)); */

// Metodo filter() Devuelve un array solo con los elmentos filtrados
/* let edades = [35, 15, 25, 69, 81, 36, 51, 55];

function edad_laboral(edad) {
    if(edad >= 18 && edad <= 67) {
        return edad;
    }
}

document.write(edades.filter(edad_laboral));
//document.write(edades.filter(edad_laboral=> edad_laboral >= 18 && edad_laboral <= 67));
console.log(edades.filter(edad_laboral)); */

// Metodo findIndex()
let edades = [35, 15, 25, 69, 81, 36, 51, 55, 112];
let nombres = ["Ana", "Juan", "Pedro", "Maria", "Pablo"];

//document.write(nombres.findIndex(encontrar => encontrar == "Juan"));
//console.log(edades.findIndex(encontrar => encontrar > 50));

// Metodo findIndex()
//document.write(edades.find(encontrar => encontrar % 13 == 0)); // undefined
//document.write(nombres.find(encontrar => encontrar.charAt(0) == 'J'));
//document.write(nombres.find(encontrar => encontrar.charAt(encontrar.length - 1) == 'o'));

// Metodos every(), some()
document.write(edades.every(menores => menores < 100)); // todos los elementos cumplen la funcion
document.write(edades.some(menores => menores > 100)); // algun elemento cumple la funcion

if(nombres.some(comienza => comienza.charAt(0) == "Z")) {
    document.write("Hay algun nombre que comienza por Z")
}else {
    document.write("No hay ningun nombre que comienze por Z")
}