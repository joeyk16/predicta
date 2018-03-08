import React, { Component } from 'react';
import imagesService from './services/imagesService.js';
const ReactS3Uploader = require('react-s3-uploader');

class Home extends Component {
  constructor() {
    super()

    this.imagesService = new imagesService();
  }

  getSignedUrl = (file, callback) => {
    this.imagesService.upload(file, callback)
  }

  render() {
    return (
      <div className="container">
        <h1>Predicta</h1>
        <section>
          <div className="dropzone">
            <ReactS3Uploader
              getSignedUrl={this.getSignedUrl.bind(this)}
              accept="image/*"
              uploadRequestHeaders={{
                'x-amz-acl': 'public-read'
              }}
              contentDisposition="auto"
            />
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
