const AWS = require("aws-sdk");
const sqs = new AWS.SQS();

export async function notificationService(status, orderDetails, user) {
    try {
        // 1 - created, 2- processing, 3- shipped, 4- delivered, 5-undelivered, 6-cancelled by user, 7-cancelled by company, 8- return
        let subject;
        let body;
        switch (status) {
            case 1:
                subject = 'Your order was successfully placed';
                body = `Order details`
                break;
            case 2:
                subject = 'Your order was processing by the seller';
                body = 'Your Order was successfully processed by the company. Sit back and relax on the shipping. Will notify once shipped'
                break;
            case 3:
                subject = 'Your order was successfully shipped';
                body = 'Company has shipped the order and will reach you soon'
                break;
            case 4:
                subject = 'Your order was successfully delivered';
                body = 'Enjoy the hassle shipping and chill with order'
                break;
            case 5:
                subject = 'Your order was undelivered';
                body = 'Due to the some shipping issues, your order was undelivered. Wait for next action by us'
                break;
            case 6:
                subject = 'Your order was cancelled';
                body = 'You cancelled the order. Sorry. Will meet you on next time'
                break;
            case 7:
                subject = 'Your order was cancelled by the company';
                body = 'Due to the some shipping issues, your order was cancelled by the company. Wait for next action by us'
                break;
            case 8:
                subject = 'Your return was confirmed';
                body = 'Company has accepeted the return. Sit back and relax on the next step'
                break;
            default:
            // code block
        }
        const not = await sqs.sendMessage({
            QueueUrl: "https://sqs.us-west-1.amazonaws.com/441836939852/ecom-notification-poc-dev-MailQueue-YfMfoMxTY1SD",
            MessageBody: JSON.stringify({
                subject,
                body,
                recipient: user.email
            })
        }).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(not),
        };
    } catch (ex) {
        return {
            statusCode: 500,
            body: JSON.stringify(ex),
        };
    }
}