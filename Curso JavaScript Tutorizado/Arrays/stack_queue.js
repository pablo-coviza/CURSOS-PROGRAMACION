let edades = [35, 15, 25, 69, 81, 36, 51, 55, 112];
let nombres = ["Ana", "Juan", "Pedro", "Maria", "Pablo"];

// Metodos push() y pop() para insertar y eliminar elementos al final del Array

/* document.write(edades);
document.write("<br/>");

edades.pop();
document.write(edades); */

// Metodos shift() y unshift() agregan elementos al principio de un Array y el otro los elimina
nombres.unshift("Luis");

document.write(nombres);
document.write("</br>");

nombres.shift();
document.write(nombres);

let eliminado = nombres.shift();
document.write("</br>");
document.write(eliminado);
document.write("</br>");
document.write(nombres);