import Modal from 'react-responsive-modal';
import 'react-responsive-modal/lib/react-responsive-modal.css';

import { PropTypes } from 'prop-types';
import React, { Component } from 'react';

import FlashMessages from '../components/common/FlashMessages.js';

import ClarifaiTrainer from './ClarifaiTrainer'
import clarifaiApi from '../services/clarifaiApi.js';

export default class Image extends Component {
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

  componentDidMount() {
    this.clarifaiApi =  new clarifaiApi()
    this.flashMessages =  new FlashMessages()
  }

  onOpenModal = () => {
    const url = this.props.url

    this.clarifaiApi.predict(url)
      .then(res => {
        if (res.status.code === 10000) {
          this.setState({
            open: true,
            concepts: res.outputs[0].data.concepts,
          })
        } else {
          this.flashMessages.error(res.data.status.details)
        }
      })
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open, concepts } = this.state;
    const { url, imageKey, modelConcepts } = this.props;

    return (
      <div className="col-sm" key={imageKey}>
        <img className="img-thumbnail" onClick={this.onOpenModal} src={url} alt="..." width="160"></img>
        <Modal open={open} onClose={this.onCloseModal} little>
          <div className="row">
            <div className="col-6">
              <img src={url} alt="..." className="w-100"/>
            </div>
            <div className="col-6" >
              <div className="bg-light p-4">
                <h3 className="pb-2">Train Model</h3>
                <ClarifaiTrainer
                  imageUrl={url}
                  modelConcepts={modelConcepts}
                />
              </div>
              <div className="mt-4 px-4 h-50 scroll">
                <h3 className="pb-2">Results</h3>
                { concepts.map((concept, i) =>
                  <div key={i}>
                    <p className="font-weight-bold">{concept.name}</p>
                    <p className="font-weight-light">{concept.value * 100}%</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  };
}
