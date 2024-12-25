let triangulo = {
    base: 12,
    altura: 15,
    /* area() {
        return (this.base * this.altura) / 2;
    } */
    get area() {
        return (this.base * this.altura) / 2;
    },

    set area(nuevaBase) {
        this.base = nuevaBase;
    }
}

//document.write(triangulo.area());

//triangulo.area = 100;
document.write(triangulo.area + "</br>");

let persona = {
    nombre: "Pablo",
    apellido: "Coviza",

    get datos() {
        return (this.nombre + " " + this.apellido);
    },
    set datos(nuevosDatos) {
        [this.nombre, this.apellido] = nuevosDatos.split(" ");
    }
}

document.write(persona.datos);

// persona.datos = "Rafael DelMoral";
// document.write(persona.datos);
