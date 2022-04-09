const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

const objBusqueda = {
	moneda: '',
	criptomoneda: '',
};

document.addEventListener('DOMContentLoaded', () => {
	consultarCriptomonedas();

	formulario.addEventListener('submit', submitFormulario);

	criptomonedasSelect.addEventListener('change', leerValor);

	monedaSelect.addEventListener('change', leerValor);
});

//*Crear un promise
const obtenerCriptomonedas = (criptomonedas) =>
	new Promise((resolve) => {
		resolve(criptomonedas);
	});

function consultarCriptomonedas() {
	const url =
		'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

	fetch(url)
		.then((respuesta) => respuesta.json())
		.then((resultado) => obtenerCriptomonedas(resultado.Data))
		.then((criptomonedas) => selectCriptomonedas(criptomonedas));
}

function selectCriptomonedas(criptomonedas) {
	criptomonedas.forEach((cripto) => {
		const {FullName, Name} = cripto.CoinInfo;

		const option = document.createElement('option');
		option.value = Name;
		option.textContent = FullName;

		criptomonedasSelect.appendChild(option);
	});
}

function leerValor(e) {
	objBusqueda[e.target.name] = e.target.value;
}

function submitFormulario(e) {
	e.preventDefault();

	//!Validar

	const {moneda, criptomoneda} = objBusqueda;

	if (moneda === '' || criptomoneda === '') {
		mostrarAlerta('Ambos campos son obligatorios');
		return;
	}
}

function mostrarAlerta(mensaje) {
	const divMensaje = document.createElement('div');
	divMensaje.classList.add('error');
	divMensaje.textContent = mensaje;

	formulario.appendChild(divMensaje);

	setTimeout(() => {
		divMensaje.remove();
	}, 3000);
}
