// vai controlar a lista 

// funcao construtora // semelhante ao que fizemos no modulo form-controller
function State() { // S maiusculo 
    this.listSection = null; // é dentro dessa listSection que vou acrescentar novos elementos depois
}

// instanciei // semelhante ao que fizemos no modulo form-controller
const state = new State();

// funcao que vai ser o init() desse meu componente, vai iniciar
export function init() {
    state.listSection = document.querySelector("#list-section");
}

// funcao para adicionar o card na tela 
export function addCard(address) {
    const card = createCard(address);
    state.listSection.appendChild(card); // vou adicionar esse card no meu listSection que crei acima
}

// funcao responsavel por criar um card
function createCard(address) {
    const div = document.createElement("div"); // cria uma div
    div.classList.add("card-list-item"); // adicionou na div a classe card-list-item

    const h3 = document.createElement("h3");
    h3.innerHTML = address.city; // objeto address la na funcao construtora Address tem o atributo city

    const line = document.createElement("p");
    line.classList.add("address-line"); // adicionando ao meu p uma classe address-line
    line.innerHTML = `${address.street}, ${address.number}`;

    const cep = document.createElement("p");
    cep.classList.add("address-cep"); // adicionando ao meu p´uma classe address-cep
    cep.innerHTML = address.cep;

    div.appendChild(h3);
    div.appendChild(line);
    div.appendChild(cep);

    return div;
}
