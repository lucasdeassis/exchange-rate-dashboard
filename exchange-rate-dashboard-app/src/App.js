import React, { Component } from 'react'
import logo from './business.svg'
import './App.css'

import CardCurrency from './components/card_currency.js'
import dolar from './dolar.js'
import euro from './euro.js'
import { LineChart, Line,  XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import tinydate from 'tinydate'

class App extends Component {

  //TODO: Receber os dados de cada mes e popular no data
  data = [
    {name: 'jan', euro: 4000, dolar: 2400},
    {name: 'fev', euro: 3000, dolar: 1398},
    {name: 'mar', euro: 2000, dolar: 9800},
    {name: 'abr', euro: 2780, dolar: 3908},
    {name: 'mai', euro: 1890, dolar: 4800},
    {name: 'jun', euro: 2390, dolar: 3800},
    {name: 'jul', euro: 3490, dolar: 4300},
    {name: 'ago', euro: 3490, dolar: 4300},
    {name: 'set', euro: 3490, dolar: 4300},
    {name: 'out', euro: 3490, dolar: 4300},
    {name: 'nov', euro: 3490, dolar: 4300},
  ];

  constructor(props) {
    super(props)
    this.state = {
      dolar : 0,
      euro : 0,
      euromeses : [],
      bitcoin : 0
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

    const months = this.initializeMonths()

    Promise.all(months.map(month => euro.getMonth(month)))
      .then((euroResponse) => {
        const euromeses = []
        for (let i = 0; i < euroResponse.length; i++) {
          const { rates } = euroResponse[i];
          euromeses.push(rates.BRL)
        }
        this.setState({ euromeses })
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
              currencyName="Bitcoin"
              value="R$ 3.25"
              baseCurrency="₿ 1.00"
              currencyImgSrc="http://freeiconbox.com/icon/256/37054.png">
            </CardCurrency>
          </div>

        </div>

      <div className="chart">
        <h2>Historical changes</h2>
        <LineChart width={700} height={300} data={this.data}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Line type="monotone" dataKey="dolar" stroke="#8884d8" activeDot={{r: 8}}/>
          <Line type="monotone" dataKey="euro" stroke="#82ca9d" />
        </LineChart>
      </div>

      </div>

    )
  }
}

export default App
