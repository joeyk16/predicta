import React, { Component } from 'react';
import imagesService from './services/imagesService.js';
const ReactS3Uploader = require('react-s3-uploader');

class Home extends Component {
  constructor() {
    super()
    this.state = {
      imageUrls: [],
    };
  }

  componentWillMount() {
    this.imagesService = new imagesService();
    this.imagesList()
  }

  getSignedUrl = (file, callback) => {
    this.imagesService.create(file, callback)
    // TODO: Remove reload and update state
    window.location.reload();
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
    const imageUrls = this.state.imageUrls

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
        <section>
        <div className="row">
          <div className="col-sm">
            { imageUrls.map((url) =>
                <a href={url} className="thumbnail">
                  <img src={url} alt="..." width="100"></img>
                </a>
            )}
          </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
