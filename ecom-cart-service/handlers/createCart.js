const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const middy = require('middy')
const { validateJWTToken } = require('../utils/jwtGenerator')
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createCart(event, context) {

  try {
    const { restaurant_id, product_id, qty } = JSON.parse(event.body);
    const id = v4();
    const now = new Date();

    const productDet = event.companyProducts.find(a => a.id === product_id)
    const taxPrice = (5 * Number(productDet?.selling_price))/100;

    const payload = {
      id,
      user_id: event.user.id,
      restaurant_id,
      product_price: productDet?.selling_price,
      product_tax: taxPrice,
      product_id,
      is_deleted: false,
      qty,
      date: now.toISOString(),
    };
    const result = await dynamodb
      .put({
        TableName: "CartTable",
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

export const handler = middy(createCart)
  .use(validateJWTToken)