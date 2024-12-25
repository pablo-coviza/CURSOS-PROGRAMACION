let fecha = new Date();

console.log(fecha);
console.log(fecha.toLocaleString());

let msg = new String("Curso de Javascript");

console.log(msg);
console.log(msg.valueOf());

const EJEMPLONOMBRE = "color";

function nombrePropiedad() {
    return "potencia" + "_coche"
};

/* let coche = {};

coche[EJEMPLONOMBRE] = "verde";
coche[nombrePropiedad()] = 400; */ 

// con ES9
let coche = {
    [EJEMPLONOMBRE]: "verde",
    [nombrePropiedad()]: 400
};

console.log(coche);


// spread operator ES2018
let cochecito = { color: "rojo", peso: 1400 };

let furgoneta = { potencia: 2200, plazas: 6, capacidad: "alta" };

let suv = {
    ...cochecito,
    ...furgoneta
};

console.log(suv);