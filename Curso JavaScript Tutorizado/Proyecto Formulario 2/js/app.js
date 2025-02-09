const { z } = Zod;

window.addEventListener('load', function () {

    const userName = document.querySelector('#nombre');
    const password = document.getElementById('password');
    const eMail = document.getElementById('email');
    const subject = document.getElementById('asunto');
    const message = document.getElementById('mensaje');
    const botonEnviar = document.querySelector('#formulario button[type="submit"]');
    const botonBorrar = document.querySelector('#formulario button[type="reset"]');

    userName.addEventListener('blur', validarFormulario);
    password.addEventListener('blur', validarFormulario);
    eMail.addEventListener('blur', validarFormulario);
    subject.addEventListener('blur', validarFormulario);
    message.addEventListener('blur', validarFormulario);

    const objFormulario = {

        nombre: "",
        password: "",
        email: "",
        asunto: "",
        mensaje: ""

    };

    // Cuando pulsamos el boton Borrar, deshabilitamos el boton Enviar vaciando los valores del objFormulario
    botonBorrar.addEventListener('click', (e) => {

        objFormulario.nombre = '';
        objFormulario.password  = '';
        objFormulario.email = '';
        objFormulario.asunto = '';
        objFormulario.mensaje = '';

        comprobarFormulario();

    })

    // Mientras que todos los campos del formulario esten vacios, el boton estara desactivado.
    function comprobarFormulario() {

        if (Object.values(objFormulario).includes('')) {

            botonEnviar.classList.add('opacity-50');
            botonEnviar.disabled = true;

        } else {

            botonEnviar.classList.remove('opacity-50');
            botonEnviar.disabled = false;

        }

    }

    function validarFormulario(e) {

        if (e.target.value.trim() == "" && e.target.id != 'email') {

            mostrarError(`El campo ${e.target.id} es obligatorio.`, e.target.parentElement);

            return;

        }

        if (e.target.id == "email") {

            const emailSchema = z.string().email({ message: "El email no es válido" });

            const result = emailSchema.safeParse(e.target.value);

            if (!result.success) {
                // console.log(result.error.errors[0])
                mostrarError(result.error.errors[0].message, e.target.parentElement);
                return;
            }
        }

        quitarAviso(e.target.parentElement);

        objFormulario[e.target.name] = e.target.value;

        comprobarFormulario();

        console.log(objFormulario)

    }

    function mostrarError(mensaje, elemento) {

        if (elemento.querySelector(".bg-red-600")) {
            return;
        }

        const error = document.createElement("p");

        error.textContent = mensaje;

        error.classList.add("bg-red-600", "text-white", "text-center", "p-2");

        elemento.appendChild(error);

    }

    function quitarAviso(elemento) {

        const alerta = elemento.querySelector(".bg-red-600");

        if (alerta) alerta.remove();
    }

});

