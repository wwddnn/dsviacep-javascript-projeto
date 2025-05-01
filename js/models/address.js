
// funcao construtora Address
// vou criar uma definicao do tipo do meu objeto do formulario que é o Address
export default function Address(cep, street, number, city) {
    this.cep = cep;
    this.street = street;
    this.number = number;
    this.city = city;
}