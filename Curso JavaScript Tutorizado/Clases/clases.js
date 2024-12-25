// Creacion de una clase con propiedades y un metodo
/* class Usuario{

    constructor(nombre, password, perfil){
        this.nombre = nombre;
        this.password = password;
        this.perfil = perfil;

    }

    saludar() {
        return "Saludos";
    }
    login() {
        return "Estoy haciendo log in";
    }
    logout() {
        return "Estoy haciendo log out";
    }

} */

// Herencia de clases para poder reutilizar codigo
/* class Estudiante extends Usuario{
    constructor(curso, nombre, password, perfil){
        super(nombre, password, perfil); // Llamamos al constructor de la clase padre
        this.curso = curso;
    }

    estudia(tema) {
        return `Estoy estudiando ${tema}`;
    }
}

let persona1 = new Usuario("Pablo", 1234, "Administrador");
let estudiante1 = new Estudiante("Pildoras Informaticas", "Pedro", 12345, "Admin");

document.write("Soy " + persona1.nombre + " " + persona1.saludar());
document.write("</br>");
document.write(estudiante1.nombre);
document.write("</br>"); */

// Herencia de clases predefinidas (built-in-classes)
/* class ManejoArray extends Array {
    get primero() {
        return this[0];
    }
    get ultimo() {
        return this[this.length - 1];
    }
}

let array1 = new ManejoArray();
array1.push("Pablo", "Sandra", "Alejandro", "Manolo", "Fulgencio");

document.write(array1.primero);
document.write("</br>");
document.write(array1.ultimo);
document.write("</br>"); */

// Uso super() para llamar a la super clase 
/* class Animal {
    constructor(ojos, patas) {
        this.ojos = ojos;
        this.patas = patas;
    }

    come(alimento) {
        return `El animal come: ${alimento}`;
    }
    caracteristicas() {
        //return `El animal introducido tiene ${ojos} y ${patas}`;
        return "El animal introducido tiene " + this.ojos + " ojos, " + this.patas + " patas.";
    }
}

class Perro extends Animal {
    constructor(ojos, patas, hocico) {
        super(ojos, patas);
        this.hocico = hocico;
    }

    come(alimento) {
        return super.come("carne");
    }
    caracteristicas() {
        return super.caracteristicas() + " y " + this.hocico + " hocico.";
    }
}

let tobi = new Perro(2, 4, 1);

document.write(tobi.hocico);
document.write("</br>");
document.write(tobi.caracteristicas());
document.write("</br>"); */

// Clase Map y sus metodos 
/* class MapaTipos extends Map {

    constructor(tipo_clave, tipo_valor, valores) {

        if(valores) {
            for(let [clave, valor] of valores) {
                if(typeof clave !== tipo_clave || typeof valor !== tipo_valor) {
                    throw new TypeError( document.write(`Error en los tipos de ${clave} y ${valor}`));
                    // throw Error(`Error en los tipos de ${clave} y ${valor}`);
                }
            }
        }
        super(valores);
    }
}

let mis_datos = [["nombre", "Pablo"], ["dni", 485828282], ["direccion", "calle 5"]];

let datos = new MapaTipos("string", "string", mis_datos);

document.write(datos.get("direccion"));
document.write("</br>"); */

// Clases Abstractas (Las que hereden de esta clase abstracta estan obligadas a sobreescribir los metodos declarados en esta.)
// En cuanto exista un metodo vacio dentro de una clase, esta clase es implicitamente una clase Abstracta.
/* class Persona { 
    habla() {
        throw new Error("Este es un metodo abstracta y se debe sobreescribir en las subclases");
    }
}

class Empleado extends Persona {
    habla() {
        return "El empleado habla Griego";
    }
}

class Alumno extends Persona {
    habla() {
        return "El empleado habla Chino";
    }
}

let emp1 = new Empleado();
let emp2 = new Alumno();

document.write(emp1.habla());
document.write("</br>");
document.write(emp2.habla());
document.write("</br>"); */

// Como crear metodos constructores en clases abstractas que impidan que estas sean instanciadas.
