const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const middy = require('middy')
const { validateJWTToken } = require('../utils/jwtGenerator')
const { uploadPictureToS3 } = require('../services/uploadPictureToS3')
async function updateProduct(event, context) {

    try {
        let user;
        const { id } = event.pathParameters;
        const result = await dynamodb
            .get({
                TableName: "ProductsTable",
                Key: { id }
            })
            .promise();
        user = result.Item;
        if (user) {
            const { product_name, description, qty, products_price, making_price, production_price, selling_price } = JSON.parse(event.body);
            const base64 = await JSON.parse(event.body).image.replace(/^data:image\/\w+;base64,/, '');
            const buffer = await Buffer.from(base64, 'base64');
            const imageformat = JSON.parse(event.body).image.split(';')[0].split('data:')[1]
            const imageUrl = await uploadPictureToS3(`${id}.${JSON.parse(event.body).image.split(';')[0].split('/')[1]}`, imageformat, buffer)

            const updatePayload = {
                TableName: "ProductsTable",
                Key: { id },
                UpdateExpression: 'set #product_image_url = :product_image_url, #product_name = :product_name,#description = :description,#qty = :qty,#products_price=:products_price,#making_price=:making_price,#production_price=:production_price,#selling_price=:selling_price',
                ExpressionAttributeValues: {
                    ':product_image_url': imageUrl,
                    ':product_name': product_name,
                    ':description': description,
                    ':qty': qty,
                    ':products_price': products_price,
                    ':making_price': making_price,
                    ':production_price': production_price,
                    ':selling_price': selling_price,
                },
                ExpressionAttributeNames: {
                    '#product_image_url': 'product_image_url',
                    '#product_name': 'product_name',
                    '#description': 'description',
                    '#qty': 'qty',
                    '#products_price': 'products_price',
                    '#making_price': 'making_price',
                    '#production_price': 'production_price',
                    '#selling_price': 'selling_price'
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

export const handler = middy(updateProduct)
  .use(validateJWTToken)