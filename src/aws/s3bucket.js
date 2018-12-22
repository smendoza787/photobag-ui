import AWS from 'aws-sdk';
import bluebird from 'bluebird';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: process.env.REACT_APP_AWS_REGION
});

AWS.config.setPromisesDependency(bluebird);

export const BUCKET_NAME = 'photobaggy'

export default new AWS.S3();