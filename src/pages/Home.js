import React, { Component } from 'react';
import clarifaiApi from '../services/clarifaiApi.js';
import imagesService from '../services/imagesService.js';
import Image from '../components/Image';
const ReactS3Uploader = require('react-s3-uploader');

class Home extends Component {
  constructor() {
    super()
    this.state = {
      imageUrls: [],
      modelConcepts: [],
    };
  }

  componentWillMount() {
    this.imagesService = new imagesService();
    this.clarifaiApi =  new clarifaiApi()
    this.modelConcepts()
    this.imagesList()
  }

  modelConcepts() {
    this.clarifaiApi.modelConcepts(this.setModelConcepts)
  }

  setModelConcepts = (modelConcepts) => {
    this.setState({
      modelConcepts: modelConcepts,
    })
  }

  getSignedUrl = (file, callback) => {
    this.imagesService.create(file, callback)
  }

  imagesList() {
    this.imagesService.index(this.imageUrls, this.setImageUrls)
  }

  setImageUrls = (imageUrls) =>  {
    this.setState({
      imageUrls: imageUrls,
    })
  }

  imageUrls(s3Images) {
    return s3Images.Contents.map((image) =>
      `https://s3.amazonaws.com/predicta-app/${image.Key}`
    )
  }

  render() {
    const { imageUrls, modelConcepts } = this.state;

    return (
      <div className="container">
        <h1 className="pb-2">Predicta</h1>
        <section className="pb-4">
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
        <section>
          <div className="row">
            { imageUrls.map((url, key) =>
              <Image
                key={key}
                imageKey={key}
                url={url}
                modelConcepts={modelConcepts}
              />
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
