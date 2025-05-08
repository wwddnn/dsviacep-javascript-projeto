
// essa funcao instancia um objeto de error, e passa como argumento uma mensagem. é bem comum fazer assim
// https://rollbar.com/guides/javascript/how-to-throw-exceptions-in-javascript/
export default function RequestException(message) {
    const error = new Error(message);
    return error;
  }
  
  // a funcao criada RequestException vai ter o mesmo prototype da funcao error
  RequestException.prototype = Object.create(Error.prototype);