import React from 'react';
import uuid4 from 'uuid4';
import s3 from '../../aws/s3bucket';

import './Home.css';

const Bucket = 'photobaggy';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      bucketContents: [],
      uploadFile: {}
    };

    this.onUploadChange = this.onUploadChange.bind(this);
    this.onUploadSubmit = this.onUploadSubmit.bind(this);
  }

  componentDidMount() {
    this.setBucketContents();
  }

  setBucketContents() {
    const params = { Bucket };
    
    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        this.setState({ bucketContents: data.Contents });
      }
    })
  }

  renderBucketContents(bucketContents) {
    if (bucketContents.length === 0) {
      return <h2>Loading bucket contents...</h2>
    }
    return bucketContents.map((content, i) => {
      const url = s3.getSignedUrl('getObject', {
        Bucket,
        Key: content.Key,
        Expires: 60 * 5
      });
      return <img key={i} src={url} />
    });
  }

  onUploadChange(event) {
    this.setState({ uploadFile: event.target.files[0] });
  }

  onUploadSubmit(event) {
    event.preventDefault();
    
    this.uploadFile(this.state.uploadFile, 'jpg');
  }

  uploadFile(buffer, type) {
    const params = {
      ACL: 'public-read',
      Body: buffer,
      Bucket,
      ContentType: 'image/jpg',
      Key: `${uuid4()}.${type}`
    };
  
    return s3.upload(params).promise()
      .then(res => {
        const content = { Key: res.key };
        this.setState({ bucketContents: [...this.state.bucketContents, content] });
      });
  };

  render() {
    console.log(this.state);
    return (
      <div className="home">
        <h1>Home</h1>
        <div className="home-contents">
          { this.renderBucketContents(this.state.bucketContents) }
          <h2>Upload</h2>
          <form onSubmit={this.onUploadSubmit}>
            <input type="file" accept="image/png, image/jpeg" onChange={this.onUploadChange} />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Home;