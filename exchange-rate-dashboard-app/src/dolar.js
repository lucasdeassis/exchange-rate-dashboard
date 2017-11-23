const dolar = {
  get: () => {
    return fetch('https://api.fixer.io/latest?base=USD&symbols=BRL')
      .then((response) => response.json());
  }
}

export default dolar;
