// Identificando los elementos del HTML
const listaCursos = document.querySelector('#lista-cursos');

const carro = document.querySelector('#carro');

const vaciarCarro = document.querySelector('#vaciar-carro');

const contenidoCarro = document.querySelector('#carro tbody');

const botonAgregarCurso = document.querySelector('#agregar-curso');

let productosCarro = [];

const agregarCurso = (e) => {

    // Previene el comportamiento por defecto del evento
    e.preventDefault();

    const cursoSeleccionado = getDatosCursos(e.target.parentElement.parentElement);

    // Verifica si el elemento clicado contiene la clase 'agregar-carro'
    e.target.classList.contains('agregar-carro') ? agregarAlCarro(cursoSeleccionado) : null;

}

const getDatosCursos = (c) => {

    return {
        imagen: c.querySelector('img').src,
        titulo: c.querySelector('h4').textContent,
        precio: c.querySelector('.precio span').textContent,
        cantidad: 1
    };
};

const agregarAlCarro = (curso) => {

    // Evita agregar duplicados
    if (!productosCarro.some(producto => producto.titulo === curso.titulo)) {
        productosCarro.push(curso);

        // Limpia el tbody para evitar duplicados visuales
        contenidoCarro.innerHTML = '';

        productosCarro.forEach(element => {

            const filaTabla = document.createElement('tr');

            filaTabla.innerHTML = `
            <td></td>
            <td>${element.titulo}</td>
            <td>${element.precio}</td>
            <td>${element.cantidad}</td>
            `;

            const imagen = document.createElement('img');
            imagen.src = element.imagen;
            imagen.width = 80;
            imagen.height = 50;

            filaTabla.children[0].appendChild(imagen);

            contenidoCarro.appendChild(filaTabla);

        });
    }

}

listaCursos.addEventListener('click', agregarCurso);



