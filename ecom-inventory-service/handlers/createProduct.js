const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const middy = require('middy')
const { validateJWTToken } = require('../utils/jwtGenerator')
const { uploadPictureToS3 } = require('../services/uploadPictureToS3')

async function createProduct(event, context) {

  try {
    const { product_name, description, qty, products_price, making_price, production_price, selling_price } = JSON.parse(event.body);
    const id = v4();
    const now = new Date();
    const base64 = await JSON.parse(event.body).image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = await Buffer.from(base64, 'base64');
    const imageformat = JSON.parse(event.body).image.split(';')[0].split('data:')[1]
    const imageUrl = await uploadPictureToS3(`${id}.${JSON.parse(event.body).image.split(';')[0].split('/')[1]}`, imageformat, buffer)
    const payload = {
      id,
      restaurant_id: event.user.id,
      product_image_url: imageUrl,
      product_name,
      description,
      is_available: true,
      is_deleted: false,
      qty: Number(qty),
      products_price,
      making_price,
      production_price,
      selling_price,
      date: now.toISOString(),
    };
    const result = await dynamodb
      .put({
        TableName: "ProductsTable",
        Item: payload,
      })
      .promise();

    return {
      statusCode: 201,
      body: JSON.stringify(result),
    };
  } catch (ex) {
    return {
      statusCode: 500,
      body: JSON.stringify(ex),
    };
  }
}

export const handler = middy(createProduct)
  .use(validateJWTToken)