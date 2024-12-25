
// 
let renault =  { potencia: 4400 };
renault.loquesea = "aleatoriooo";

document.write(renault + "</br>")

// Convertir a string
let serializado = JSON.stringify(renault);
document.write(serializado + "</br>");

// Convertir a Objeto
let deSerializado = JSON.parse(serializado);
document.write(deSerializado);
