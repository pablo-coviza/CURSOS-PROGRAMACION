/* Con el operador spread se puede crear una copia del Array */

let numeros = [7, 9, 12, 55, 15];
let copia_numeros = [...numeros];
numeros[0] = 21;
copia_numeros[0] = 99;

for(let datos in copia_numeros) {
    document.write(copia_numeros[datos] + "<br/>");
}

document.write("-----------------------------" + "<br/>");

for(let datos in numeros) {
    document.write(numeros[datos] + "<br/>");
}

document.write("-----------------------------" + "<br/>")

let nombre = [..."Pablo Coviza"];
for(let i = 0; i < nombre.length; i++) {
    document.write(`nombre[${i}] -> ` + nombre[i] + "<br/>");
}