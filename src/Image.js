import Modal from 'react-responsive-modal';
import 'react-responsive-modal/lib/react-responsive-modal.css';

import { PropTypes as T } from 'prop-types';
import React, { Component } from 'react';

import { clarifaiKey, clarifaiModel } from './config';
const Clarifai = require('clarifai');
const clarifaiClient = new Clarifai.App({
  apiKey: clarifaiKey,
 });

class Image extends Component {
  static propTypes = {
    imageKey: T.number.isRequired,
    url: T.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      imageKey: props.imageKey,
      url: props.url,
      open: false,
      details: [],
    };
  }

  onOpenModal = () => {
    const url = this.state.url

    clarifaiClient.models.predict(clarifaiModel, [url])
      .then((response, err) =>
        { if (response.status.description === 'Ok') {
          this.setState({
            open: true,
            details: response.outputs[0].data.concepts,
          })
        } else {
          // TODO: add flash error
        }}
      )
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { url, open, details, imageKey } = this.state;

    return (
      <div className="col-sm" key={imageKey}>
        <img onClick={this.onOpenModal} src={url} alt="..." width="100"></img>
        <Modal open={open} onClose={this.onCloseModal} little>
          <div className="row">
            <div className="col-6">
              <img src={url} alt="..." className="w-100"></img>
            </div>
            <div className="col-6">
              { details.map((tag) =>
                <div>
                  <p className="font-weight-bold">{tag.name}</p>
                  <p className="font-weight-light">{tag.value}%</p>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    );
  };
}

export default Image;
