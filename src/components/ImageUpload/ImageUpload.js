import React from 'react';
import Dropzone from 'react-dropzone';
import Spinner from 'react-spinkit';
import uuid4 from 'uuid4';
import s3, { BUCKET_NAME } from '../../aws/s3bucket';

import './ImageUpload.css';

class ImageUpload extends React.Component {

  constructor() {
    super();

    this.state = {
      uploadFiles: [],
      isUploading: false,
      filePreviews: ''
    };

    this.renderLoading = this.renderLoading.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  renderLoading() {
    if (this.state.isUploading) {
      return <Spinner name="circle" color="green" />;
    }
  }

  onDrop(accFiles, rejfiles) {
    this.setState({ uploadFiles: [accFiles[0]] });

    const reader = new FileReader();

    reader.onloadend = event => {      
      this.setState({
        filePreviews: event.srcElement.result
      })
    }

    reader.readAsDataURL(accFiles[0]);
  }

  uploadFile() {
    const { uploadFiles } = this.state;
    const albumId = this.props.currAlbum.albumId;
    const uploadFileIsEmpty = uploadFiles.length === 0;
        
    if (!uploadFileIsEmpty) {
      this.setState({ isUploading: true });

      const params = {
        ACL: 'public-read',
        Body: this.state.uploadFiles[0],
        Bucket: BUCKET_NAME,
        ContentType: 'image/jpg',
        Key: `${albumId}/${uuid4()}.jpg`
      };
  
      return s3.upload(params).promise()
        .then(s3Response => {
          this.props.handleUpload(s3Response);

          this.setState({
            isUploading: false,
            uploadFiles: [],
            filePreviews: ''
          });
        });
    }
  }

  renderDropZone() {
    return (
      <div className="dropzone">
        <p>Click or drag photos here to upload...</p>
      </div>
    );
  }

  renderDropZoneHover() {
    return (
      <div className="dropzone-hover">
        <p>YEAAAAAH drop that sweet bad boi</p>
      </div>
    );
  }

  renderActiveDropZone() {
    return (
      <div className="dropzone-active">
        { this.state.uploadFiles.map((file, i) => <img className="upload-preview" src={this.state.filePreviews} key={i} alt="" />) }
      </div>
    );
  }

  render() {    
    return (
      <div className="image-upload">
        { this.renderLoading() }
        <Dropzone onDrop={this.onDrop} onDragEnter={this.onDragEnter}>
          {({getRootProps, getInputProps, isDragActive}) => {
            return (
              <div
                {...getRootProps()}>
                <input {...getInputProps()} />
                {
                  isDragActive
                    ? this.renderDropZoneHover()
                    : (this.state.uploadFiles.length > 0)
                      ? this.renderActiveDropZone()
                      : this.renderDropZone()
                }
              </div>
            )
          }}
        </Dropzone>
        <button onClick={this.uploadFile}>
          Upload
        </button>
      </div>
    );
  }
}

export default ImageUpload;