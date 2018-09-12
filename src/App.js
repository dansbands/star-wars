import React, { Component } from 'react';
import './css/App.css';
import PersonPicker from './components/PersonPicker'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Star Wars</h1>
        </header>
        <p className="App-intro">
          Choose a character
        </p>
        <PersonPicker />
      </div>
    );
  }
}

export default App;
