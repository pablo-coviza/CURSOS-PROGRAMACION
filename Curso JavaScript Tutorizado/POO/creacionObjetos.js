let coche = {};
coche.color = "blanco";
coche.peso = 1400;

//coche.color = "gris";
coche["color"] = "gris";

//coche.pasajeros = 9;
coche["pasajeros"] = 9;

let borrar_propiedad = delete coche.pasajeros;

// true si consigue borrar, de lo contrario devuelve false
document.write(borrar_propiedad + "</br>");
// true si contiene la propiedad color, de lo contrario false
document.write(coche.hasOwnProperty("pasajeros"));

let mi_Objeto = new Object();
let mi_Array = new Array();
let mi_Map = new Map();

mi_Array = [1, 2, 4, 10, 22];

for (let i = 0; i < 5; i++) {
    coche[`cilindrada${i}`] = 2000 + (i * 100) + " cc";
}

console.log(coche.cilindrada0);
console.log(coche);

// Utilizar el metodo Object.create() crea un nuevo Objeto utilizando el prototipo del objeto padre.
let yo = {
    nombre: "Pablo",
    edad: 33,
    sexo: "Varon"
}

let tu = Object.create(yo);
tu.nombre = "Pablo2";

console.log(yo);
console.log(tu);