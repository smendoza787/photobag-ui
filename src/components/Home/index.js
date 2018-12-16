import React from 'react';
import s3 from '../../aws/s3bucket';
import ImageUpload from '../ImageUpload';

import './Home.css';

const Bucket = 'photobaggy';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      photoList: []
    };

    this.addImageToPhotos = this.addImageToPhotos.bind(this);
  }

  componentDidMount() {
    this.setPhotos();
  }

  setPhotos() {
    const params = { Bucket };
    
    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        this.setState({ photoList: data.Contents });
      }
    })
  }

  renderPhotos(bucketContents) {
    if (bucketContents.length === 0) {
      return <h2>Loading bucket contents...</h2>
    }
    return bucketContents.map((content, i) => {
      const url = s3.getSignedUrl('getObject', {
        Bucket,
        Key: content.Key,
        Expires: 60 * 5
      });

      return <img key={i} src={url} alt="" />
    });
  }

  addImageToPhotos(s3Response) {
    this.setState({ photoList: [...this.state.photoList, s3Response] });
  }

  render() {    
    return (
      <div className="home">
        <h1>Home</h1>
        <div className="home-contents">
          { this.renderPhotos(this.state.photoList) }
        </div>
        <ImageUpload handleUpload={ this.addImageToPhotos } />
      </div>
    );
  }
}

export default Home;