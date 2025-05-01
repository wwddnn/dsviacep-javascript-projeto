// https://rollbar.com/guides/javascript/how-to-throw-exceptions-in-javascript/

// essa funcao instancia um objeto de error, e passa como argumento uma mensagem
export default function RequestException(message) {
    const error = new Error(message);
    return error;
  }
  
  // a funcao que criei RequestException, vai ter o mesmo prototype da funcao error que é padrao 
  RequestException.prototype = Object.create(Error.prototype);