import React from 'react';
import Dropzone from 'react-dropzone';
import uuid4 from 'uuid4';
import s3 from '../../aws/s3bucket';

const Bucket = 'photobaggy';

class ImageUpload extends React.Component {

  constructor() {
    super();

    this.state = {
      uploadFile: {},
      isUploading: false
    };

    this.renderLoading = this.renderLoading.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  renderLoading() {
    if (this.state.isUploading) {
      return <h1>Uploading...</h1>;
    }
  }

  onDrop(accFiles, rejfiles) {
    this.setState({ uploadFile: accFiles[0] });
  }

  uploadFile() {
    const uploadFileIsEmpty = Object.keys(this.state.uploadFile).length === 0
      && this.state.uploadFile.constructor === Object;
        
    if (!uploadFileIsEmpty) {
      const params = {
        ACL: 'public-read',
        Body: this.state.uploadFile,
        Bucket,
        ContentType: 'image/jpg',
        Key: `${uuid4()}.jpg`
      };
  
      return s3.upload(params).promise()
        .then(s3Response => {
          this.props.handleUpload(s3Response);

          this.setState({
            isUploading: false,
            uploadFile: {}
          });
        });
    }
  }

  render() {
    return (
      <>
        <h1>Upload</h1>
        <Dropzone onDrop={this.onDrop} onDragEnter={this.onDragEnter} className="poop">
          {({getRootProps, getInputProps, isDragActive}) => {
            return (
              <div
                {...getRootProps()}>
                <input {...getInputProps()} />
                {
                  isDragActive
                    ? <p>YEAAAAAH drop that sweet bad boi</p>
                    : <p>Click or drag photos here to upload...</p>
                }
              </div>
            )
          }}
        </Dropzone>
        <button onClick={this.uploadFile}>
          Upload
        </button>
      </>
    );
  }
}

export default ImageUpload;