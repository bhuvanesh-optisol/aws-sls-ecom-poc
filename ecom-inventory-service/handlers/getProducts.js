const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const middy = require('middy')
const { validateJWTToken } = require('../utils/jwtGenerator')

async function getProducts(event, context) {

  try {
    const { res_id } = event.pathParameters;
    let users;
    var params = {
      TableName: "ProductsTable",
      ExpressionAttributeNames: {
        "#restaurant_id": "restaurant_id",
        "#is_available": "is_available",
        "#isDeleted": "is_deleted"
      },
      ExpressionAttributeValues: {
        ":restaurant_id": res_id,
        ":is_available": true,
        ":isDeletedValue": false,
      },
      FilterExpression: "#restaurant_id = :restaurant_id and #is_available=:is_available and #isDeleted=:isDeletedValue",
    };
    const result = await dynamodb
      .scan(params)
      .promise();
    users = result.Items;
    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  } catch (ex) {
    return {
      statusCode: 500,
      body: JSON.stringify(ex),
    };
  }
}

export const handler = middy(getProducts)
  .use(validateJWTToken)