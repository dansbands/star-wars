import React, { Component } from 'react';
import './css/App.css';
import PersonPicker from './components/PersonPicker'
import { getPerson, getFilm } from './utils/index.js'
import moment from 'moment'
import loader from './img/bb8.gif'
import logo from './img/logo.jpg'
import logo2 from './img/logo2.jpg'

class App extends Component {
  state = {
    person: {
      name: "",
      url: ""
    },
    data: [],
    films: [],
    loading: false
  }

  handleChange = person => {
    console.log('handleChange', person);
    this.setState({ person, loading: true, films: [] }, () => {
      getPerson(this.state.person)
      .then(data => {
        this.getFilms(data.films)
        this.setState({ data, loading: false })
      })
    })
  }

  getFilms = (films) => {
    let newFilms = []
    if (films) {
      films.map(f => {
        getFilm(f)
        .then(data => newFilms.push(data))
        .then(films => this.setState({ films: newFilms }))
      })
    } else {
      this.setState({ films: [] })
    }
  }

  renderFilms = () => {
    let newFilms =
    this.state.films.length ?
    this.state.films.map(f => {
      return (
        <div>
          <h3>{f.title} - {this.formatDate(f.release_date)}</h3>
        </div>
      )
    }) : "No films listed"

    return newFilms
  }

  formatDate = (date) => {
    const months = {
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
      '12': 'December'
    }
    let day = this.getDayOfWeek(date)
    date = date.split('-')
    let year = date.shift()
    date.push(year)
    date[0] = months[date[0]]
    date = date.join(' ')
    date = `${day}, ${date}`
    return date
  }

  getDayOfWeek = (date) => {
    let dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
  }

  render() {
    console.log('state', this.state);
    // console.log('films', films);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo2} alt="Star Wars" width="150px"/>
        </header>
        <PersonPicker handleChange={this.handleChange}/>
        {this.state.loading &&
          <img src={loader} width="100px" alt="loading" />
        }
        {this.state.person.name && !this.state.loading &&
          <h3>Films that {this.state.person.name} appears in:</h3>
        }
        {this.state.films && !this.state.loading && this.state.data.films && this.state.data.films.length === this.state.films.length &&
          this.renderFilms()
        }
        {this.state.person.name && !this.state.loading && !this.state.films.length &&
          'No films available'
        }
      </div>
    );
  }
}

export default App;
