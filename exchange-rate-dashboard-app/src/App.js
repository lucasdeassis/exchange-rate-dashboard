import React, { Component } from 'react'
import './App.css'

import CardCurrency from './components/card_currency.js'
import { LineChart, Line,  XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import tinydate from 'tinydate'

import dolar from './currency/dolar.js'
import euro from './currency/euro.js'
import logo from './business.svg'
import pound from './currency/pound.js';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dolar : 0,
      euro : 0,
      pound : 0,
      data : [
        {name: 'jan'},
        {name: 'fev'},
        {name: 'mar'},
        {name: 'abr'},
        {name: 'mai'},
        {name: 'jun'},
        {name: 'jul'},
        {name: 'ago'},
        {name: 'set'},
        {name: 'out'},
        {name: 'nov'},
      ],
      dolarDone: false,
      euroDone: false,
      poundDone: false
    }

  }

  componentDidMount() {

  }

  componentWillMount() {
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
        for (let i = 0; i < euroResponse.length; i++) {
          const { rates } = euroResponse[i];
          temp[i].euro = rates.BRL
        }
        temp[10].euro = this.state.euro
        this.setState({
          data: temp,
          euroDone: true
        })
      })

      Promise.all(months.map(month => dolar.getMonth(month)))
      .then((dolarResponse) => {
        for (let i = 0; i < dolarResponse.length; i++) {
          const { rates } = dolarResponse[i]
          temp[i].dolar = rates.BRL
        }
        temp[10].dolar = this.state.dolar
        this.setState({
          data: temp,
          dolarDone: true
        })
      })

      Promise.all(months.map(month => pound.getMonth(month)))
      .then((poundResponse) => {
        for (let i = 0; i < poundResponse.length; i++) {
          const { rates } = poundResponse[i]
          temp[i].pound = rates.BRL
        }
        temp[10].pound = this.state.pound
        this.setState({
          data: temp,
          poundDone: true
        })
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
              currencyImgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Pound_Sign.svg/768px-Pound_Sign.svg.png">
            </CardCurrency>
          </div>

        </div>

      <div className="chart">
        <h2>Historical changes</h2>
        { (this.state.dolarDone && this.state.euroDone && this.state.poundDone) ?
        <LineChart width={700} height={300} data={this.state.data}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Line type="monotone" dataKey="euro" stroke="#82ca9d" />
          <Line type="monotone" dataKey="pound" stroke="#880000" />
          <Line type="monotone" dataKey="dolar" stroke="#0090FF" />
        </LineChart>
        :
        <div><h3>Loading...</h3></div>
        }
      </div>

      </div>

    )
  }
}

export default App
