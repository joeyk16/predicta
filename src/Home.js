import React, { Component } from 'react';
import imagesService from './services/imagesService.js';
import Image from './Image';
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

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

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
    const { imageUrls } = this.state;
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
            { imageUrls.map((url, key) =>
              <Image
                key={key}
                imageKey={key}
                url={url}
              >
              </Image>
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
