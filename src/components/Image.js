import Modal from 'react-responsive-modal';
import 'react-responsive-modal/lib/react-responsive-modal.css';

import { PropTypes } from 'prop-types';
import React, { Component } from 'react';

import ClarifaiNegatives from './ClarifaiNegatives'

import { clarifaiKey, clarifaiModel } from '../config/secrets';
const Clarifai = require('clarifai');
const clarifaiClient = new Clarifai.App({
  apiKey: clarifaiKey,
 });

class Image extends Component {
  static propTypes = {
    imageKey: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    modelConcepts: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      concepts: [],
    };
  }

  onOpenModal = () => {
    const url = this.props.url

    clarifaiClient.models.predict(clarifaiModel, [url])
      .then((response, err) =>
        {
          if (response.status.description === 'Ok') {
            this.setState({
              open: true,
              concepts: response.outputs[0].data.concepts,
            })
          } else {
          // TODO: add flash error
          }
        }
      )
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open, concepts } = this.state;
    const { url, imageKey, modelConcepts } = this.props;

    return (
      <div className="col-sm" key={imageKey}>
        <img onClick={this.onOpenModal} src={url} alt="..." width="100"></img>
        <Modal open={open} onClose={this.onCloseModal} little>
          <div className="row">
            <div className="col-6">
              <img src={url} alt="..." className="w-100"/>
              <ClarifaiNegatives
                url={url}
                modelConcepts={modelConcepts}
              />
            </div>
            <div className="col-6">
              { concepts.map((concept) =>
                <div>
                  <p className="font-weight-bold">{concept.name}</p>
                  <p className="font-weight-light">{concept.value}%</p>
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