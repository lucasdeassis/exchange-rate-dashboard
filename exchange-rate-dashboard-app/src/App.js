import React, { Component } from 'react';
import logo from './business.svg';
import './App.css';

import CardCurrency from './components/card_currency.js';
import dolar from './dolar.js';
import euro from './euro.js'
import { LineChart, Line } from 'recharts';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dolar : 0,
      euro : 0,
      euromeses : [],
      bitcoin : 0
    };

  }

  componentDidMount() {
    dolar.get().then( data => {
      this.setState( {
        dolar : data.rates.BRL
      })
    })
    euro.get().then( data => {
      this.setState( {
        euro: data.rates.BRL
      })
    })
    euro.getMonth('01').then( data => {
      let euromeses = [ data.rates.BRL, ...this.state.euromeses]
          this.setState({
              euromeses
          })
    })
    euro.getMonth('02').then( data => {
      let euromeses = [ data.rates.BRL, ...this.state.euromeses]
      this.setState({
          euromeses
      })
    })
    euro.getMonth('03').then( data => {
      let euromeses = [ data.rates.BRL, ...this.state.euromeses]
      this.setState({
          euromeses
      })
    })
    euro.getMonth('04').then( data => {
      let euromeses = [ data.rates.BRL, ...this.state.euromeses]
      this.setState({
          euromeses
      })
    })
    euro.getMonth('05').then( data => {
      let euromeses = [ data.rates.BRL, ...this.state.euromeses]
      this.setState({
          euromeses
      })
    })
    euro.getMonth('06').then( data => {
      let euromeses = [ data.rates.BRL, ...this.state.euromeses]
      this.setState({
          euromeses
      })
    })
    euro.getMonth('07').then( data => {
      let euromeses = [ data.rates.BRL, ...this.state.euromeses]
      this.setState({
          euromeses
      })
    })
    euro.getMonth('08').then( data => {
      let euromeses = [ data.rates.BRL, ...this.state.euromeses]
      this.setState({
          euromeses
      })
    })
    euro.getMonth('09').then( data => {
      let euromeses = [ data.rates.BRL, ...this.state.euromeses]
      this.setState({
          euromeses
      })
    })
    euro.getMonth('10').then( data => {
      let euromeses = [ data.rates.BRL, ...this.state.euromeses]
      this.setState({
          euromeses
      })
    })

  }

  render() {
    console.log(this.state.euromeses.map( euromes => ({euromes}) ));
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
              value={'R$ ' + this.state.euro}
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
        <LineChart width={400} height={400} data={this.state.euromeses.map( euromes => ({euromes}) )}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          </LineChart>
      </div>

    );
  }
}

export default App;
