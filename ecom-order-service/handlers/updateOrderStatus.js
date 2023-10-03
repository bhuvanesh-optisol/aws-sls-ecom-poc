const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { notificationService } = require("../services/notification");
const middy = require('middy')
const { validateCompanyJWTToken } = require('../utils/jwtGenerator')

async function updateOrderStatus(event, context) {

    try {
        let orderDetails;
        const { id } = event.pathParameters;
        const result = await dynamodb
            .get({
                TableName: "OrdersTable",
                Key: { id }
            })
            .promise();
        orderDetails = result.Item;
        if (orderDetails) {
            const { status } = JSON.parse(event.body);
            const updatePayload = {
                TableName: "OrdersTable",
                Key: { id },
                UpdateExpression: 'set #status = :status',
                ExpressionAttributeValues: {
                    ':status': status
                },
                ExpressionAttributeNames: {
                    '#status': 'status'
                },
                ReturnValues: 'ALL_NEW',
            };
            const updateResult = await dynamodb.update(updatePayload).promise();

            let result = await dynamodb
                .get({
                    TableName: "UsersTable",
                    Key: { id: orderDetails.user_id }
                })
                .promise();
            const getUserLoginDetail = result.Item;
            await notificationService(Number(status), JSON.stringify(updateResult),getUserLoginDetail);
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

export const handler = middy(updateOrderStatus)
    .use(validateCompanyJWTToken);