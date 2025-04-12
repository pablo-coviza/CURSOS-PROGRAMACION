const criptoSelect = document.querySelector('#criptomonedas');
const monedaFiatSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultadoDiv = document.querySelector('#resultado');

const monedasBusquedas = {

    moneda: '',
    criptomoneda: ''

}

// Creamos la promesa
const consultarCriptomonedas = criptomonedas => new Promise(

    resolve => {

        resolve(criptomonedas);
    }

);

document.addEventListener("DOMContentLoaded", () => {

    cargarCriptos();

    formulario.addEventListener('submit', enviarFormulario);
    criptoSelect.addEventListener("change", leerMoneda);
    monedaFiatSelect.addEventListener("change", leerMoneda);

});

function cargarCriptos() {

    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => consultarCriptomonedas(resultado.Data))
        .then(criptomonedas => selectCriptomonedas(criptomonedas))
}

function selectCriptomonedas(criptomonedas) {

    criptomonedas.forEach(cripto => {

        const { FullName, Internal } = cripto.CoinInfo;
        const option = document.createElement('option');

        option.value = Internal;
        option.textContent = FullName;

        criptoSelect.appendChild(option);

    });

}

function leerMoneda(e) {

    monedasBusquedas[e.target.name] = e.target.value;

    console.log(monedasBusquedas);

}

function enviarFormulario(e) {

    e.preventDefault();

    if (monedasBusquedas.moneda == '' || monedasBusquedas.criptomoneda == '') {

        alert('Debes seleccionar ambos campos');

        return;

    }

    consultaAPI();

}

function consultaAPI() {

    const { moneda, criptomoneda } = monedasBusquedas;

    const url = `https://min-api.cryptocompare.com/data/price?fsym=${criptomoneda}&tsyms=${moneda}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(equivalencia => {
            console.log(equivalencia)
            mostrarPrecioCripto(equivalencia[moneda]);

        });

}

function mostrarPrecioCripto(precio) {

    resultadoDiv.innerHTML = `Actualmente cotiza a: ${precio}`

}