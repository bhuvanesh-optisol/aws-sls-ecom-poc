const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const middy = require('middy')
const { validateCompanyJWTToken } = require('../utils/jwtGenerator')

async function getCompanies(event, context) {

  try {
    let UsersTable;
    var params = {
      TableName: "CompanyTable",
      ExpressionAttributeNames: {
        "#isDeleted": "is_deleted"
      },
      ExpressionAttributeValues: {
        ":isDeletedValue": false,
      },
      FilterExpression: "#isDeleted=:isDeletedValue",
    };
    const result = await dynamodb
      .scan(params)
      .promise();
      
    UsersTable = result.Items;
    return {
      statusCode: 200,
      body: JSON.stringify(UsersTable),
    };
  } catch (ex) {
    return {
      statusCode: 500,
      body: JSON.stringify(ex),
    };
  }
}

export const handler = middy(getCompanies)
  .use(validateCompanyJWTToken)