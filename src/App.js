import React, { Component } from 'react';
import './css/App.css';
import PersonPicker from './components/PersonPicker'
import FilmCard from './components/FilmCard'
import FilmModal from './components/FilmModal'
import { getPerson, getFilm } from './utils/index.js'
import ViewGridIcon from 'mdi-react/ViewGridIcon';
import FormatListBulletedIcon from 'mdi-react/FormatListBulletedIcon';
import loader from './img/bb8.gif'
import logo2 from './img/logo2.jpg'

class App extends Component {
  state = {
    person: {
      name: "",
      url: ""
    },
    data: [],
    films: [],
    currentFilm: {},
    loading: false,
    row: false,
    modal: false
  }

  handleChange = person => {
    this.showLoader()
    this.setState({ person, films: [] }, () => {
      getPerson(this.state.person)
      .then(data => {
        this.getFilms(data.films)
        this.setState({ data })
      })
    })
  }

  getFilms = (films) => {
    let newFilms = []
    if (films) {
      films.map(f => {
        return getFilm(f)
        .then(data => newFilms.push(data))
        .then(films => this.setState({ films: this.sortFilms(newFilms) }))
      })
    } else {
      this.setState({ films: [] })
    }
  }

  sortFilms = films => {
    films = films.sort((a,b) => {
      // console.log('sort a', a.release_date);
      // console.log('sort b', b.release_date);
      if(a.release_date < b.release_date) return -1;
      if(a.release_date > b.release_date) return 1;
      return 0;
    })
    return films
  }

  renderFilms = () => {
    let newFilms =
    this.state.films.length ?
    this.state.films.map(f => {
      return <FilmCard
        onClick={() => this.pickFilm(f)}
        film={f}
        row={this.state.row}
        key={f.episode_id}/>
    })
    : "No films listed"
    return newFilms
  }

  showLoader = () => {
    this.setState({ loading: true })
    setTimeout(() => this.setState ({loading: false}), 1000)
  }

  toggleRow = () => {
    this.setState({ row: !this.state.row})
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal })
  }

  pickFilm = currentFilm => {
    this.setState({ currentFilm })
    this.toggleModal()
  }

  render() {
    // console.log('state', this.state);
    let rowClass = this.state.row ? "active" : "inactive"
    let gridClass = this.state.row ? "inactive" : "active"
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo2} alt="Movie Poster" width="150px"/>
            <div className="App-header-center">
              <PersonPicker handleChange={this.handleChange}/>
            </div>
            <div className="App-header-right">
              <ViewGridIcon onClick={this.toggleRow} className={gridClass}/>
              <FormatListBulletedIcon onClick={this.toggleRow} className={rowClass}/>
            </div>
        </header>

        {this.state.loading &&
          <div className="movies">
            <img src={loader} width="200px" alt="loading" className="loader" />
          </div>
        }

        {this.state.person.name && !this.state.loading &&
          <h3 className="subheader-caption">Films that {this.state.person.name} appears in:</h3>}

        {this.state.films && !this.state.loading && this.state.data.films && this.state.data.films.length === this.state.films.length &&
          <div className="movies">
            {this.renderFilms()}
          </div>
          }

        {this.state.person.name && !this.state.loading && !this.state.films.length &&
          'No films available'}

        {!this.state.person.name &&
          <div className="welcome">
            <div className="welcome-inner">
              <h1>Welcome!</h1>
              <h2>Choose a Character</h2>
              <h2>Using the Menu Above</h2>
            </div>
          </div>
        }

        <FilmModal
          modal={this.state.modal}
          toggleModal={this.toggleModal}
          data={this.state.currentFilm}/>
      </div>
    );
  }
}

export default App;
