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

  trainNegative = () => {
    const modelConcept = this.state.modelConcept

    this.clarifaiApi.trainNegative(
      this.props.imageUrl,
      this.state.modelConcept,
      this.flashMessage
    )
  }

  flashMessage(message, type) {
    if (type === 'success') {
      NotificationManager.success(message);
    } else {
      NotificationManager.error(message)
    }
  }

  render() {
    const  modelConcepts = this.props.modelConcepts

    console.log('modelConcepts', modelConcepts)
    return(
      <div className="pt-4">
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
          className="btn btn-primary"
          onClick={this.trainNegative}
        >
          Train as negative
        </button>
      </div>
    )
  }
}
