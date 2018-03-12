import Modal from 'react-responsive-modal';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import { PropTypes as T } from 'prop-types';
import React, { Component } from 'react';

class Image extends Component {
  static propTypes = {
    url: T.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      url: props.url,
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { url, open } = this.state;

    return (
      <div className="col-sm">
        <img onClick={this.onOpenModal} src={url} alt="..." width="100"></img>

        <Modal open={open} onClose={this.onCloseModal} little>
          <h2>Simple centered modal</h2>
        </Modal>
      </div>
    );
  };
}

export default Image;
