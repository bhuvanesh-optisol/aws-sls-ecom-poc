const AWS = require("aws-sdk");
const s3 = new AWS.S3();

export async function uploadPictureToS3(key, imageformat, body) {
  const result = await s3.upload({
    Bucket: 'product-images3',
    Key: key,
    Body: body,
    ContentEncoding: 'base64',
    ContentType: imageformat,
  }).promise();

  return result.Location;
}