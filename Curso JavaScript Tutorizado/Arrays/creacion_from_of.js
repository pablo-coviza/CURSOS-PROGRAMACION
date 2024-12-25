let numeros = new Array(); // Lo mismo que: let numeros = []
let nombres = new Array(5); // Indica la cantidad de elementos que tendra. 
let paises = new Array("Colombia", "Mexico", "Suiza");
let mi_numero = Array.of(15); // Crea un Array con el valor numerico pasado por paramentro
let nuevo_array = Array.from(paises); // Crea un nuevo Array a partir de otro Array

console.log(nuevo_array);

function suma_numeros(valor) {
    return valor * 2;
}

let array = new Array(5, 10, 15, 20, 25);
let copia_array = Array.from(array, suma_numeros); // Al metodo Array.from() se le puede pasar una funcion como 2ndo parametro

console.log(copia_array);