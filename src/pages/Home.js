import { NotificationContainer } from 'react-notifications';
import Dropzone from 'react-dropzone'
import React, { Component } from 'react';
import clarifaiApi from '../services/clarifaiApi.js';
import imagesService from '../services/imagesService.js';
import Image from '../components/Image';
import FlashMessages from '../components/common/FlashMessages.js';
const MdFileUpload = require('react-icons/lib/md/file-upload');

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
    this.flashMessages =  new FlashMessages()

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

  deleteImage(imageUrl) {
    this.imagesService.delete(imageUrl, this.imageDeleted)
  }

  imageDeleted = (imageUrl) => {
    const imageUrls = this.state.imageUrls

    this.setState({
      imageUrls: imageUrls.filter(function(url) { return url !== imageUrl })
    })

    this.flashMessages.success('Image successfully deleted')
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.flashMessages.success(`${acceptedFiles.length} images uploading`)
    acceptedFiles.map(file =>
      this.imagesService.upload(file, this.addImageUrl)
    )
  }

  addImageUrl = (imageUrl) => {
    const imageUrls = this.state.imageUrls
    imageUrls.push(imageUrl)
    this.setState({ imageUrls: imageUrls })
    this.flashMessages.success('Image succesfully uploaded')
  }

  render() {
    const { imageUrls, modelConcepts } = this.state;

    return (
      <div>
        <nav className="navbar navbar-light bg-dark">
          <span className="navbar-brand mb-0 h1 text-white">Predicta</span>
        </nav>
        <div className="container">
          <NotificationContainer/>
          <section className="py-4">
            <Dropzone
              className="jumbotron"
              onDrop={this.onDrop}
              name="hello"
            >
              <div className="d-flex bd-highlight center justify-content-center">
                <div className="bd-highlight">
                  <MdFileUpload
                    width="70"
                    height="70"
                  />
                </div>
                <div className="align-self-baseline bd-highlight">
                  <h3>Upload Files</h3>
                  <p>Drag and drop or click</p>
                </div>
              </div>
            </Dropzone>
          </section>
          <section>
            <div className="row">
              { imageUrls.map((url, key) =>
                <div key={key}>
                  <Image
                    imageKey={key}
                    url={url}
                    modelConcepts={modelConcepts}
                  />
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => this.deleteImage(url)}
                    >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Home;
