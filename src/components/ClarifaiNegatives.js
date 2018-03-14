import { PropTypes } from 'prop-types';
import React, { Component } from 'react';

export default class ClarifaiNegatives extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    modelConcepts: PropTypes.array.isRequired,
  }

  render() {
    console.log('asfsdf', this.props.modelConcepts)
    return(
      <div>
        sfdsf
      </div>
    )
  }
}
