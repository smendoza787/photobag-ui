import React from 'react';
import s3 from '../../aws/s3bucket';

import './Home.css';

const bucketUrl = 'https://s3-us-west-2.amazonaws.com/photobaggy/';
const Bucket = 'photobaggy';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      bucketContents: []
    };
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
    return bucketContents.map((content, i) => <img key={i} src={`${bucketUrl}${content.Key}`} />);
  }

  render() {
    return (
      <div className="home">
        <h1>Home</h1>
        <div className="home-contents">
          { this.renderBucketContents(this.state.bucketContents) }
        </div>
      </div>
    );
  }
}

export default Home;