import React, { Component } from 'react';
import './css/App.css';
import PersonPicker from './components/PersonPicker'
import { getPerson, getFilm } from './services/index.js'

class App extends Component {
  state = {
    person: 1,
    data: [],
    films: []
  }

  componentWillMount() {
    getPerson(this.state.person)
    .then(data => {
      this.setState({ data })
      this.getFilms(data.films)
    })
  }

  getFilms = (films) => {
    console.log('getFilms', films);
    let newFilms = []
    films.map(f => {
      getFilm(f)
      .then(data => newFilms.push(data))
      .then(films => this.setState({ films: newFilms }))
    })
  }

  render() {
    console.log('state.films', this.state.films);
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
