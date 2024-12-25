let numeros = [7, 9, 12, 55, 15];
let datos = [1.5, true, "Juan", {alto: 100, ancho: 300}];
let valor = 500;
let mas_numeros = [valor, valor + 100, valor + 200];
let mas_datos = [[7, {color: "rojo", potencia: 350}], [15, {nombre: "Juan", apellido: "Diaz"}]];

//document.write(numeros[2] + "</br>");

//document.write(JSON.stringify(datos));

for(todos in datos) {
    document.write(JSON.stringify(datos[todos]) + "</br>");
}
