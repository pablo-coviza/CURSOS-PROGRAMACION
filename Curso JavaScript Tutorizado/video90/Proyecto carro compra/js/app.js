// ====================================
// SELECCIÓN DE ELEMENTOS DEL DOM
// ====================================

// Obtiene la lista donde se muestran los cursos disponibles
const listaCursos = document.querySelector('#lista-cursos');

// Obtiene el contenedor principal del carrito
const carro = document.querySelector('#carro');

// Obtiene el botón para vaciar todo el carrito
const vaciarCarro = document.querySelector('#vaciar-carro');

// Obtiene el tbody de la tabla donde se mostrarán los cursos en el carrito
const contenidoCarro = document.querySelector('#carro tbody');

// Array que almacena los productos agregados al carrito
let productosCarro = [];

// ====================================
// FUNCIONES PRINCIPALES
// ====================================

/**
 * Maneja el evento de agregar un curso al carrito
 * @param {Event} e - Evento del click
 *
 * Esta función:
 * 1. Previene el comportamiento por defecto del enlace
 * 2. Verifica si se hizo click en un botón de agregar al carrito
 * 3. Si es así, obtiene los datos del curso y lo agrega al carrito
 */
const agregarCurso = (e) => {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carro')) {
        const cursoSeleccionado = getDatosCursos(e.target.parentElement.parentElement);
        agregarAlCarro(cursoSeleccionado);
        console.log(productosCarro);
    }
};

/**
 * Extrae la información relevante de un curso del DOM
 * @param {HTMLElement} c - Elemento contenedor del curso
 * @returns {Object} Objeto con los datos del curso (imagen, título, precio, ID y cantidad)
 *
 * Esta función navega por el DOM para obtener:
 * - La URL de la imagen del curso
 * - El título del curso
 * - El precio
 * - El ID único del curso
 * - Establece la cantidad inicial en 1
 */
const getDatosCursos = (c) => {
    return {
        imagen: c.querySelector('img').src,
        titulo: c.querySelector('h4').textContent,
        precio: c.querySelector('.precio span').textContent,
        idCurso: c.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };
};

/**
 * Elimina todos los elementos del contenido del carrito
 *
 * Esta función limpia el tbody de la tabla del carrito
 * eliminando todos los elementos hijos uno por uno
 */
const limpiarCarro = () => {
    while (contenidoCarro.firstChild) {
        contenidoCarro.removeChild(contenidoCarro.firstChild);
    }
};

/**
 * Agrega un curso al carrito o incrementa su cantidad si ya existe
 * @param {Object} curso - Objeto con la información del curso a agregar
 *
 * Esta función:
 * 1. Busca si el curso ya existe en el carrito
 * 2. Si existe, incrementa su cantidad
 * 3. Si no existe, lo agrega al array de productos
 * 4. Actualiza la visualización del carrito
 */
const agregarAlCarro = (curso) => {
    const cursoExistente = productosCarro.find(producto => producto.idCurso === curso.idCurso);

    if (cursoExistente) {
        cursoExistente.cantidad++;
    } else {
        productosCarro.push(curso);
    }

    renderizarCarro();
};

/**
 * Actualiza la visualización del carrito en el DOM
 *
 * Esta función:
 * 1. Limpia el contenido actual del carrito
 * 2. Recorre el array de productos
 * 3. Para cada producto, crea una nueva fila en la tabla con:
 *    - Imagen del curso
 *    - Título
 *    - Precio
 *    - Cantidad
 *    - Botón para eliminar
 */
const renderizarCarro = () => {
    limpiarCarro();

    productosCarro.forEach(element => {
        const filaTabla = document.createElement('tr');

        filaTabla.innerHTML = `
            <td></td>
            <td style="text-align: center; font-size: 0.8em; font-family: 'Cascadia Code', monospace">${element.titulo}</td>
            <td style="text-align: center;">${element.precio}</td>
            <td style="text-align: center;">${element.cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${element.idCurso}">X</a></td>
        `;

        const imagen = document.createElement('img');
        imagen.src = element.imagen;
        imagen.width = 80;
        imagen.height = 50;

        filaTabla.children[0].appendChild(imagen);

        contenidoCarro.appendChild(filaTabla);
    });
};

/**
 * Maneja la eliminación de cursos del carrito
 * @param {Event} e - Evento del click
 *
 * Esta función:
 * 1. Verifica si se hizo click en un botón de eliminar
 * 2. Si es así, obtiene el ID del curso
 * 3. Si el curso tiene cantidad > 1, reduce la cantidad
 * 4. Si la cantidad es 1, elimina el curso del carrito
 * 5. Actualiza la visualización del carrito
 */
const eliminarCurso = (e) => {
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");
        const curso = productosCarro.find(curso => curso.idCurso === cursoId);

        if (curso) {
            if (curso.cantidad === 1) {
                productosCarro = productosCarro.filter(curso => curso.idCurso !== cursoId);
            } else {
                curso.cantidad--;
            }
        }

        renderizarCarro();
    }
};

// ====================================
// EVENT LISTENERS
// ====================================

// Escucha clicks en la lista de cursos para agregar al carrito
listaCursos.addEventListener('click', agregarCurso);

// Escucha clicks en el botón de vaciar carrito
vaciarCarro.addEventListener('click', () => {
    productosCarro = [];
    limpiarCarro();
});

// Escucha clicks en el carrito para eliminar cursos
carro.addEventListener('click', eliminarCurso);