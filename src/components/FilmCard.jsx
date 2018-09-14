import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'

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
    // console.log("FilmCard Props", this.props);
    let rowClass = this.props.row ? "movie-row" : "movie-card"
    let rowImage = this.props.row ? "image-row" : "image-card"
    let roman = ["I", "II", "III", "IV", "V", "VI", "VII"]
    let numeral = roman[this.props.film.episode_id - 1]
    let source = `../../img/posters/${this.props.film.episode_id}.jpg`
    return (
      <div key={this.props.film.title} className={rowClass} onClick={this.props.onClick}>
        {this.props.row ? (
          <Row className="movie-row-content align-middle">
            <Col md={2}>
              <img src={source} alt="poster" className={rowImage}/>
            </Col>
            <Col md={5} className="text-left align-middle">
              <h3>Episode {numeral}: {this.props.film.title}</h3>
            </Col>
            <Col md={5} className="text-left align-middle">
              <h3>Release Date: {this.formatDate(this.props.film.release_date)}</h3>
            </Col>
          </Row>
        ) : (
          <div>
            <img src={source} alt="poster" className={rowImage}/>
            <div className="movie-caption">
              <h6>Episode {numeral}: </h6>
              <h4>{this.props.film.title}</h4>
              <h6>Release Date: {this.formatDate(this.props.film.release_date)}</h6>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default FilmCard;
