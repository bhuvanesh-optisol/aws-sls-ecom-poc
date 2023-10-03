const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const middy = require('middy')
const { validateCompanyJWTToken } = require('../utils/jwtGenerator')

async function updateCompany(event, context) {

    try {
        let user;
        const { id } = event.pathParameters;
        const result = await dynamodb
            .get({
                TableName: "CompanyTable",
                Key: { id }
            })
            .promise();
        user = result.Item;
        if (user) {
            const { first_name, last_name } = JSON.parse(event.body);
            const updatePayload = {
                TableName: "CompanyTable",
                Key: { id },
                UpdateExpression: 'set #first_name = :first_name, #last_name = :last_name',
                ExpressionAttributeValues: {
                    ':first_name': first_name,
                    ':last_name': last_name,
                },
                ExpressionAttributeNames: {
                    '#first_name': 'first_name',
                    '#last_name': 'last_name'
                },
                ReturnValues: 'ALL_NEW',
            };
            const updateResult = await dynamodb.update(updatePayload).promise();
            return {
                statusCode: 200,
                body: JSON.stringify(updateResult),
            };
        } else {
            return {
                statusCode: 204,
                message: "No content",
                body: "No content",
            };
        }
    } catch (ex) {
        return {
            statusCode: 500,
            body: JSON.stringify(ex),
        };
    }
}

export const handler = middy(updateCompany)
  .use(validateCompanyJWTToken)