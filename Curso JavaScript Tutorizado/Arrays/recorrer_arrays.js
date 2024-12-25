let paises = new Array("Colombia", "Mexico", "Suiza");
// Forma de recorrer Arrays numero 1
lista = "";
for(let pais of paises) {
    lista += pais + "</br>";
}
document.write(lista);

// Forma de recorrer Arrays numero 2
for(let [indice, pais] of paises.entries()) {
    document.write(indice + " " + pais + "</br>")
}

// Forma de recorrer Arrays numero 3
paises.forEach((indice, elemento) => {
    document.write(elemento + " " + indice + "</br>");
    console.log(indice);
    console.log(elemento);
});

paises.forEach(pais => {
    lista += pais.toUpperCase() + " ";
})

document.write(lista);