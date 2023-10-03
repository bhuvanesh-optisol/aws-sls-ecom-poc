const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const sqs = new AWS.SQS();

export async function notificationService(status, orderDetails) {

    try {
        // 1 - created, 2- processing, 3- shipped, 4- delivered, 5-undelivered, 6-cancelled by user, 7-cancelled by company, 8- return
        let subject;
        let body;
        switch (status) {
            case 15:
                subject = `Your product ${orderDetails.product_name} is selling fast`;
                body = `Your product ${orderDetails.product_name} is selling fast. Kindly update the quantity to avoid the last minute hassle`;
                break;
            case 10:
                subject = `Remainder!!. Your product ${orderDetails.product_name} is less than 10`;
                body = `Remainder!!. Your product ${orderDetails.product_name} is less than 10. Kindly update the quantity to avoid the last minute hassle`;
                break;
            case 5:
                subject = `Remainder!!. Your product ${orderDetails.product_name} is going to sold out`;
                body = `Remainder!!. Your product ${orderDetails.product_name} is less than 5 and going to sold out. Kindly update the quantity to avoid the last minute hassle`;
                break;
            case 0:
                subject = `Oahh!!..Your product ${orderDetails.product_name} is sold out`;
                body = `Oahh!!..Your product ${orderDetails.product_name} is sold out. Kindly update the quantity`;
                break;
            default:
            // code block
        }
        if(subject && body) {
            const not = await sqs.sendMessage({
                QueueUrl: "https://sqs.us-west-1.amazonaws.com/441836939852/ecom-notification-poc-dev-MailQueue-YfMfoMxTY1SD",
                MessageBody: JSON.stringify({
                    subject,
                    body,
                    recipient: String(orderDetails?.user?.email)
                })
            }).promise();
            console.log('not', not)
            return {
                statusCode: 200,
                body: JSON.stringify(not),
            };
        }
    } catch (ex) {
        return {
            statusCode: 500,
            body: JSON.stringify(ex),
        };
    }
}