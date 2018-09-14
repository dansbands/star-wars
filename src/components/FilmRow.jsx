import React from 'react'
import PropTypes from 'prop-types'

class FilmCard extends React.Component {
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

  render () {
    console.log("FilmCard Props", this.props);
    let roman = ["I", "II", "III", "IV", "V", "VI", "VII"]
    let numeral = roman[this.props.film.episode_id - 1]
    let source = `/img/posters/${this.props.film.episode_id}.jpg`
    return (
      <div key={this.props.film.title} className="movie-card">
        <img src={source} alt="poster" height="450px" />
        <div className="movie-caption">
          <h6>Episode {numeral}: </h6>
          <h4>{this.props.film.title}</h4>
          <h6>Release Date: {this.formatDate(this.props.film.release_date)}</h6>
        </div>
      </div>
    )
  }
}

export default FilmCard;
