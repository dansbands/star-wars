import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row } from 'reactstrap';

class FilmModal extends React.Component {
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
    let { data } = this.props
    let roman = ["I", "II", "III", "IV", "V", "VI", "VII"]
    let numeral = roman[data.episode_id - 1]
    let source = `../../img/posters/${data.episode_id}.jpg`
    console.log("FilmModal Props", this.props);

    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggleModal} className="film-modal modal-lg">
          <ModalHeader toggle={this.props.toggleModal}>
            {data && data.release_date &&
              <div>
                <h3>Episode {numeral}: {data.title}</h3>
                <h5>Release Date: {this.formatDate(data.release_date)}</h5>
              </div>
            }
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md={4}>
                <img src={source} alt="poster" className="image-card"/>
              </Col>
              <Col md={8}>
                <h6>Director: {data.director}</h6>
                <h6>Producer: {data.producer}</h6>
                <div className="crawl">
                  {data.opening_crawl}
                </div>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.toggleModal}>Close</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default FilmModal;
