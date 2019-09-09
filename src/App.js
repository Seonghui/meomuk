import React, { Component } from 'react'

import Header from './components/Header'
import Inputs from './components/InputList'

import './styles/main.scss';
import Data from './data.json'


class App extends Component {
  state = {
    restaurants: Data.data
  }

  render() {
    const { restaurants } = this.state
    return (
      <div className="App">
        <Header />
        <Inputs restaurants={restaurants} />
      </div>
    );
  }
}

export default App;