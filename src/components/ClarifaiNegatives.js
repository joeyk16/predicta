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
      this.state.modelConcept
    )
    // TODO: show notification on success and error
    NotificationManager.success(`Imagent sent to ${modelConcept} as a negative`);
  }

  render() {
    const  modelConcepts = this.props.modelConcepts

    return(
      <div className="pt-4">
        <NotificationContainer/>
        <div className="form-group">
          <label for="sel1">Select concept:</label>
          <select
            className="form-control"
            id="sel1"
            onChange={this.setModelConcept}
          >
            { modelConcepts.map(mc =>
              <option>{mc.id}</option>
            ) }
          </select>
        </div>
        <button
          type="button"
          class="btn btn-primary"
          onClick={this.trainNegative}
        >
          Train as negative
        </button>
      </div>
    )
  }
}
