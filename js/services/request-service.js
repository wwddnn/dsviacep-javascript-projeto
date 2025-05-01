
import RequestException from "./exceptions/request-exception.js";

// funcao que criei para ler o json que vem da url
export async function getJson(url) {
    try {
        const response = await fetch(url);
        const jsonBody = await response.json();
        return jsonBody;
    }
    catch (e) {
        throw new RequestException("Erro ao realizar requisição");
    }
    
}