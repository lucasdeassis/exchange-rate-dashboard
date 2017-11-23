import React, { Component } from 'react';
import logo from './business.svg';
import './App.css';

import CardCurrency from './components/card_currency.js';
import dolar from './dolar.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dolar : 0,
      euro : 0,
      bitcoin : 0
    };
  }

  componentDidMount() {
    dolar.get().then( data => {
      this.setState( {
        dolar : data.rates.BRL
      })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Exchange Rate Dashboard</h1>
        </header>
        <p className="App-intro">
        Check the currency value you want to know.
        Here you can track its value and get notifications about downfall and peaks.
        </p>

      <div className="cards">
        <div className="card-currency">
          <CardCurrency
            currencyName="Dolar"
            value={'R$ ' + this.state.dolar}
            baseCurrency="$ 1.00"
            currencyImgSrc="https://www.alt-codes.net/images/dollar-sign.png">
          </CardCurrency>
          </div>

          <div className="card-currency">
            <CardCurrency
              currencyName="Euro"
              value="R$ 3.25"
              baseCurrency="€ 1.00"
              currencyImgSrc="http://pngimg.com/uploads/euro_sign/euro_sign_PNG21580.png">
            </CardCurrency>
          </div>

          <div className="card-currency">
            <CardCurrency
              currencyName="Bitcoin"
              value="R$ 3.25"
              baseCurrency="₿ 1.00"
              currencyImgSrc="http://freeiconbox.com/icon/256/37054.png">
            </CardCurrency>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
