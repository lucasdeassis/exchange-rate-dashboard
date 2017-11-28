const euro = {
  get: () => {
    return fetch('https://api.fixer.io/latest?base=EUR&symbols=BRL')
      .then((response) => response.json());
  },
  getMonth: (month) => {
    return fetch('https://api.fixer.io/2017-'+month+'-01?base=EUR&symbols=BRL')
    .then((response) => response.json());
  }
}

export default euro;
