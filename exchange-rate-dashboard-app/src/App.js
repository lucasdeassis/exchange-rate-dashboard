import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CardCurrency from './components/card_currency.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Exchange Rate Dashboard</h1>
        </header>
        <p className="App-intro">
          Stay updated about your favorite currency
        </p>

      <div className="cards">
        <div className="card-currency">
          <CardCurrency
            currencyName="Dolar"
            value="R$3.25"
            baseCurrency="$ 1.00">
          </CardCurrency>
          </div>

          <div className="card-currency">
            <CardCurrency
              currencyName="Euro"
              value="R$3.25"
              baseCurrency="€ 1.00">
            </CardCurrency>
          </div>

          <div className="card-currency">
            <CardCurrency
              currencyName="Bitcoin"
              value="R$3.25"
              baseCurrency="₿ 1.00">
            </CardCurrency>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
