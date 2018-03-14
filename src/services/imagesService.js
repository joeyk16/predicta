import AWS from 'aws-sdk';
import { awsAccessKey, awsSecretKey } from '../config/secrets';
AWS.config.region = 'us-east-1';
AWS.config.accessKeyId = awsAccessKey;
AWS.config.secretAccessKey = awsSecretKey;

const s3Client = new AWS.S3();
const bucketName = "predicta-app";

export default class imagesService {
  index(imageUrls, setImageList) {
    var params = {
      Bucket: bucketName,
      MaxKeys: 1000
    };

    return s3Client.listObjects(params, function(err, s3Images) {
      if (err) console.log(err, err.stack);
      else setImageList(imageUrls(s3Images));
    })
  }

  create(file, callback) {
    var params = {
      Bucket: bucketName,
      Key: file.name,
      Expires: 60,
      ContentType: file.type,
      ACL: 'public-read',
    };

    s3Client.getSignedUrl(
      'putObject',
      params,
      (error, signedUrl) => {
        callback({
          signedUrl,
        })
      }
    )
  }
}
