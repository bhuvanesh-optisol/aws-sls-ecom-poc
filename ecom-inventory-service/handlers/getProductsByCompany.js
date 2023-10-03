const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const middy = require('middy')
const { validateJWTToken } = require('../utils/jwtGenerator')

async function getProductsByCompany(event, context) {

  try {
    let users;
    var params = {
      TableName: "ProductsTable",
      ExpressionAttributeNames: {
        "#restaurant_id": "restaurant_id",
        "#isDeleted": "is_deleted"
      },
      ExpressionAttributeValues: {
        ":restaurant_id": handler.event.user.id,
        ":isDeletedValue": false,
      },
      FilterExpression: "#restaurant_id = :restaurant_id and #isDeleted=:isDeletedValue",
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

export const handler = middy(getProductsByCompany)
  .use(validateJWTToken)