let nombres = ["Pablo", "Ana", "Juan", "Pablo", "Pedro", "Pablo", "Maria", "Pablo"];

// Funcion para buscar los indices en los cuales se encuentran los strings que se quieren encontrar/buscar
function buscarNombres(elArray, elemento) {
    
    let resultados = [];
    let longitud = nombres.length;
    let posicion = 0;

    while(posicion < longitud) {
        posicion = elArray.indexOf(elemento, posicion);

        if(posicion == -1) break;

        resultados.push(posicion);
        posicion +=1;
    }
    return resultados;
}

document.write(buscarNombres(nombres, "Pablo"));
document.write("</br>");
document.write(nombres.includes("Ana"));
document.write("</br>");
document.write(nombres.join(" ")); // metodo join() para transformar el Array en texto y pasarle como paramentro el separador que quieras (coma, punto, espacio, guion...)