const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const middy = require('middy')
const { validateJWTToken } = require('../utils/jwtGenerator')
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getCartByUserId(event, context) {

    try {
        let user;
        var params = {
            TableName: "CartTable",
            ExpressionAttributeNames: {
                "#user_id": "user_id",
                "#isDeleted": "is_deleted"
            },
            ExpressionAttributeValues: {
                ":user_id": event.user.id,
                ":isDeletedValue": false,
            },
            FilterExpression: "#user_id = :user_id and #isDeleted=:isDeletedValue",
        };
        const result = await dynamodb
            .scan(params)
            .promise();

        user = JSON.stringify(result);
        if (user) {
            return {
                statusCode: 200,
                body: user,
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

export const handler = middy(getCartByUserId)
.use(validateJWTToken);