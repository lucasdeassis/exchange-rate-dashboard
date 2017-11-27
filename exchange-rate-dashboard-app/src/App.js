import React, { Component } from 'react'
import logo from './business.svg'
import './App.css'

import CardCurrency from './components/card_currency.js'
import dolar from './dolar.js'
import euro from './euro.js'
import pound from './pound.js';
import { LineChart, Line,  XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import tinydate from 'tinydate'

class App extends Component {

  //TODO: Receber os dados de cada mes e popular no data


  constructor(props) {
    super(props)
    this.state = {
      dolar : 0,
      euro : 0,
      euromeses : [],
      pound : 0,
      data : [
        {name: 'jan', euro: 0, dolar: 0},
        {name: 'fev', euro: 0, dolar: 0},
        {name: 'mar', euro: 0, dolar: 0},
        {name: 'abr', euro: 0, dolar: 0},
        {name: 'mai', euro: 0, dolar: 0},
        {name: 'jun', euro: 0, dolar: 0},
        {name: 'jul', euro: 0, dolar: 0},
        {name: 'ago', euro: 0, dolar: 0},
        {name: 'set', euro: 0, dolar: 0},
        {name: 'out', euro: 0, dolar: 0},
        {name: 'nov', euro: 0, dolar: 0},
      ]
    }

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
    pound.get().then( data => {
      this.setState( {
        pound: data.rates.BRL
      })
    })
    const months = this.initializeMonths()
    let temp = [];
    temp = [...this.state.data];
    Promise.all(months.map(month => euro.getMonth(month)))
      .then((euroResponse) => {
        const euromeses = []
        for (let i = 0; i < euroResponse.length; i++) {
          const { rates } = euroResponse[i];
          euromeses.push(rates.BRL)
          temp[i].euro = rates.BRL
        }
        temp[10].euro = this.state.euro;
        this.setState({
          euromeses ,
          data: temp,
        })

        console.log(this.state.data);
      })

    }

  initializeMonths() {
    const stamp = tinydate('{MM}')
    const months = []
    const currentMonth = new Date().getMonth()

    for (let i = 0; i < currentMonth; i++) {
      const date = new Date()
      date.setMonth(i)
      months.push(stamp(date))
    }
    return months
  }

  render() {
    console.log('euromeses', this.state.euromeses)
    console.log(this.state.euromeses.map( euromes => ({euromes}) ))
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
              currencyName="British Pound"
              value={'R$ ' + this.state.pound}
              baseCurrency="£ 1.00"
              currencyImgSrc="http://www.fileformat.info/info/unicode/char/00a3/pound_sign.png">
            </CardCurrency>
          </div>

        </div>

      <div className="chart">
        <h2>Historical changes</h2>
        <LineChart width={700} height={300} data={this.state.data}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />

          <Line type="monotone" dataKey="euro" stroke="#82ca9d" />
        </LineChart>
      </div>

      </div>

    )
  }
}

export default App
