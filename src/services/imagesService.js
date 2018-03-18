import AWS from 'aws-sdk';
import { awsAccessKey, awsSecretKey } from '../config/secrets';

AWS.config.region = 'us-east-1';
AWS.config.accessKeyId = awsAccessKey;
AWS.config.secretAccessKey = awsSecretKey;

const s3Client = new AWS.S3();
const bucketName = "predicta-app";

export default class imagesService {
  index(imageUrls, cb) {
    const params = {
      Bucket: bucketName,
      MaxKeys: 1000
    };

    return s3Client.listObjects(params, function(err, s3Images) {
      if (err) console.log(err, err.stack);
      else cb(imageUrls(s3Images));
    })
  }

  upload(file, cb) {
    const params = {
      Bucket: bucketName,
      Body: file,
      Key: file.name,
      Expires: 60,
      ContentType: file.type,
      ACL: 'public-read',
    };

    s3Client.upload(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else cb(data.Location);
    });
  }

  delete(imageUrl, cb) {
    const params = {
      Bucket: bucketName,
      Key: imageUrl.replace(`https://s3.amazonaws.com/${bucketName}/`,'')
    };

    return s3Client.deleteObject(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else cb(imageUrl);
    });
  }
}
