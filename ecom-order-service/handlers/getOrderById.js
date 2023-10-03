const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const middy = require('middy')
const { validateJWTToken } = require('../utils/jwtGenerator')

async function getOrderById(event, context) {

    try {
        let orderDetails;
        const { id } = event.pathParameters;
        const result = await dynamodb
            .get({
                TableName: "OrdersTable",
                Key: { id }
            })
            .promise();
        orderDetails = JSON.stringify(result.Item);
        if (orderDetails) {
            return {
                statusCode: 200,
                body: orderDetails,
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

export const handler = middy(getOrderById)
    .use(validateJWTToken);
