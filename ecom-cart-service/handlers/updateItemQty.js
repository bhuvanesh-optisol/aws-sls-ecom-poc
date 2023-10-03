const AWS = require("aws-sdk");
const middy = require('middy')
const { validateJWTToken } = require('../utils/jwtGenerator')
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function updateQty(event, context) {

    try {
        let user;
        const { id } = event.pathParameters;
        const result = await dynamodb
            .get({
                TableName: "CartTable",
                Key: { id }
            })
            .promise();
        user = result.Item;
        if (user) {
            const { qty } = JSON.parse(event.body);
            const updatePayload = {
                TableName: "CartTable",
                Key: { id },
                UpdateExpression: 'set #qty = :qty',
                ExpressionAttributeValues: {
                    ':qty': qty
                },
                ExpressionAttributeNames: {
                    '#qty': 'qty'
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

export const handler = middy(updateQty)
.use(validateJWTToken);