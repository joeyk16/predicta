import AWS from 'aws-sdk';
AWS.config.region = 'us-east-1';
AWS.config.accessKeyId = 'AKIAIVK5R4GYDQXHQKIQ';
AWS.config.secretAccessKey = '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';

const s3bucket = new AWS.S3();
const bucketName = "predicta-app";

export default class imagesService {
  upload(file, callback) {
    s3bucket.getSignedUrl(
      'putObject', {
        Bucket: bucketName,
        Key: file.name,
        Expires: 60,
        ContentType: file.type,
        ACL: 'public-read',
      }, (error, signedUrl) => {
        console.log(signedUrl);
        callback({
          signedUrl,
        })
      }
    )
  }
}
