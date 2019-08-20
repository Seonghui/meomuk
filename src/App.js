import React, { Component } from 'react'
import Header from './components/Header'
import Inputs from './components/InputList'
class App extends Component {
  state = {
    restaurants: [
      {
        id: 0,
        name: '장꼬방',
        distance: 1,
        price: 1,
        category: ['korean', 'soup']
      },
      {
        id: 1,
        name: '진미',
        distance: 3,
        price: 2,
        category: ['japanese', 'world']
      },
      {
        id: 2,
        name: '보쌈',
        distance: 4,
        price: 1,
        category: ['korean']
      },
      {
        id: 3,
        name: '편의점',
        distance: 1,
        price: 0,
        category: ['anytizer']
      }
    ]
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