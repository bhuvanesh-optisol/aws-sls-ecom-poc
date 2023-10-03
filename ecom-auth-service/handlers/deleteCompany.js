const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const middy = require('middy')
const { validateCompanyJWTToken } = require('../utils/jwtGenerator')

async function deleteCompany(event, context) {

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
            const updatePayload = {
                TableName: "CompanyTable",
                Key: { id },
                UpdateExpression: 'set #is_deleted = :is_deleted',
                ExpressionAttributeValues: {
                    ':is_deleted': true
                },
                ExpressionAttributeNames: {
                    '#is_deleted': 'is_deleted'
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
                body: "No content",
            };
        }
    } catch (ex) {
        return {
            statusCode: 500,
            message: ex,
            body: ex,
        };
    }
}

export const handler = middy(deleteCompany)
  .use(validateCompanyJWTToken)