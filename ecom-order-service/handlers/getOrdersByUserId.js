const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const middy = require('middy')
const { validateJWTToken } = require('../utils/jwtGenerator')
async function getOrdersByUserId(event, context) {

    try {
        let orderDetails;
        var params = {
            TableName: "OrdersTable",
            ExpressionAttributeNames: {
                "#user_id": "user_id",
            },
            ExpressionAttributeValues: {
                ":user_id": event.user.id,
            },
            FilterExpression: "#user_id = :user_id",
        };
        const result = await dynamodb
            .scan(params)
            .promise();
        orderDetails = JSON.stringify(result);
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

export const handler = middy(getOrdersByUserId)
.use(validateJWTToken);