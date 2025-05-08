// esse modulo é responsavel por controlar o formulario

import Address from '../models/address.js';
import * as addressService from '../services/address-service.js';
import * as listController from '../controllers/list-controller.js';

export function State() {  
    this.address = new Address();

    this.btnSave = null;
    this.btnClear = null;

    this.inputCep = null;
    this.inputStreet = null;
    this.inputNumber = null;
    this.inputCity = null;

    this.errorCep = null;
    this.errorNumber = null;
}

const state = new State(); 

export function init() {  
    state.inputCep = document.forms.newAddress.cep; 
    state.inputStreet = document.forms.newAddress.street; 
    state.inputNumber = document.forms.newAddress.number;
    state.inputCity = document.forms.newAddress.city;
    state.btnSave = document.forms.newAddress.btnSave; 
    state.btnClear = document.forms.newAddress.btnClear; 

    state.errorCep = document.querySelector('[data-error="cep"]'); 
    state.errorNumber = document.querySelector('[data-error="number"]');

    state.inputNumber.addEventListener('change', handleInputNumberChange);
    state.inputNumber.addEventListener('keyup', handleInputNumberKeyup);
    state.btnClear.addEventListener('click', handleBtnClearClick);
    state.btnSave.addEventListener('click', handleBtnSaveClick);
    state.inputCep.addEventListener('change', handleInputCepChange);
}

function handleInputNumberKeyup(event) {
    state.address.number = event.target.value;
}

async function handleInputCepChange(event) {
    try {
        const cep = event.target.value;
        const address = await addressService.findByCep(cep);
        state.inputStreet.value = address.street;
        state.inputCity.value = address.city;
        state.address = address; // pega o address que chegou do fetch api e poe no address criado
        setFormError("cep", "");
        state.inputNumber.focus(); // faz o ponteiro ir para o campo number a ser preenchido
    }
    catch (e) {
        state.inputStreet.value = "";
        state.inputCity.value = "";
        setFormError("cep", "Informe um CEP válido !!!!");
    }
}

function handleBtnSaveClick(event) {
    event.preventDefault();

    const errors = addressService.getErros(state.address);

    const keys = Object.keys(errors);

    if(keys.length > 0) { // é uma validacao do formulario, se tiver vazio nao deixa salvar
        keys.forEach(key => {
            setFormError(key, errors[key]);
        });
    }    
    else {
        listController.addCard(state.address);
        clearForm(); // funcao para limpar todo o formulario apos clicar no btnSave
    }    
}

function handleInputNumberChange (event) {
    if (event.target.value == "") {
        setFormError("number", "Campo requerido");
    }
    else {
        setFormError("number", "");
    }
}

function handleBtnClearClick(event) {
    event.preventDefault();
    clearForm();
}

// funcao para limpar todo o formulario
function clearForm() {
    state.inputCep.value = "";
    state.inputCity.value = "";
    state.inputNumber.value = "";
    state.inputStreet.value = "";

    setFormError("cep", "");
    setFormError("number", "");

    state.address = new Address();

    state.inputCep.focus();
}

function setFormError(key, value) { 
    const element = document.querySelector(`[data-error="${key}"]`); 
    element.innerHTML = value;
}
