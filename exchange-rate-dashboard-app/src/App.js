import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the exchange rate dashboard application </h1>
        </header>
        <p className="App-intro">
          Check the currency value you want to know. 
          Here you can track its value and get notifications about downfall and peaks.
        </p>
        
      </div>
    );
  }
}

export default App;
