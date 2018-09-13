import React, { Component } from 'react';
import './css/App.css';
import PersonPicker from './components/PersonPicker'
import { getPerson, getFilm } from './utils/index.js'


import characters from './utils/characters.json'

class App extends Component {
  state = {
    person: 1,
    data: [],
    films: [],

    characters: []
  }

  componentWillMount() {
    getPerson(this.state.person)
    .then(data => {
      this.setState({ data, characters })
      this.getFilms(data.films)
    })
  }

  getFilms = (films) => {
    // console.log('getFilms', films);
    let newFilms = []
    films.map(f => {
      getFilm(f)
      .then(data => newFilms.push(data))
      .then(films => this.setState({ films: newFilms }))
    })
  }

  renderFilms = () => {
    let newFilms = this.state.films.map(f => {
      return (
        <div>
          <h3>{f.title} - {this.formatDate(f.release_date)}</h3>
        </div>
      )
    })
    return newFilms
  }

  formatDate = (date) => {
    const years = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December'}
    date = date.split('-')
    let year = date.shift()
    date.push(year)
    date[0] = years[date[0]]
    date = date.join(' ')
    console.log('new date', date);
    return date
  }

  render() {
    let films = this.renderFilms()
    console.log('state.characters', this.state.characters);
    console.log('films', films);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Star Wars</h1>
        </header>
        <p className="App-intro">
          Choose a character
        </p>
        <PersonPicker />

        <h3>Films that {this.state.data.name} appears in:</h3>
        {this.state.films ? this.renderFilms() : 'no films'}
      </div>
    );
  }
}

export default App;
