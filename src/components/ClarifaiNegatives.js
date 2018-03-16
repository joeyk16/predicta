import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import clarifaiApi from '../services/clarifaiApi.js';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default class ClarifaiNegatives extends Component {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
    modelConcepts: PropTypes.array.isRequired,
  }

  constructor() {
    super()
    this.state = {
      modelConcept: '',
    }
  }

  componentDidMount() {
    this.clarifaiApi =  new clarifaiApi()
  }

  setModelConcept = (modelConcept) => {
    this.setState({
      modelConcept: modelConcept.target.value,
    })
  }

  trainModel = (value) => {
    const modelConcept = this.state.modelConcept
    const imageUrl = this.props.imageUrl

    this.clarifaiApi.trainModel(
      imageUrl,
      modelConcept,
      value,
    )
      .then(res => {
        if (res.status.description === "Failure") {
          this.flashMessage(res.inputs[0].status.description, 'error')
        } else {
          this.flashMessage('Image sent to your concept', 'success')
        }
      })
  }

  flashMessage(message, type) {
    // TODO: Put into own component
    if (type === 'success') {
      NotificationManager.success(message);
    } else {
      NotificationManager.error(message)
    }
  }

  render() {
    const  modelConcepts = this.props.modelConcepts

    return(
      <div className="pb-4">
        <NotificationContainer/>
        <div className="form-group">
          <label>Select concept:</label>
          <select
            className="form-control"
            id="sel1"
            onChange={this.setModelConcept}
          >
            { modelConcepts.map((mc, i) =>
              <option key={i}>{mc.id}</option>
            ) }
          </select>
        </div>
        <button
          type="button"
          className="btn btn-success mr-2"
          onClick={() => this.trainModel(true)}
        >
          Train as positive
        </button>
        <button
          type="button"
          onClick={() => this.trainModel(false)}
          className="btn btn-danger text-white"
        >
          Train as negative
        </button>
      </div>
    )
  }
}
