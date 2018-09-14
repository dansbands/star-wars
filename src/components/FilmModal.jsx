import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class FilmModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    let { data } = this.props

    console.log("FilmModal Props", this.props);

    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggleModal} className="film-modal modal-lg">
          <ModalHeader toggle={this.props.toggleModal}>{data.title}</ModalHeader>
          <ModalBody>
            {data.opening_crawl}
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
