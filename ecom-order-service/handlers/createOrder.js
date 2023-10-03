const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const middy = require('middy')
const { validateJWTToken } = require('../utils/jwtGenerator')
const { notificationService } = require("../services/notification");
async function createOrder(event, context) {
  try {
    const { restaurant_id, cart, delivery_address } = JSON.parse(event.body);
    const id = v4();
    const now = new Date();
    const cartItems = [];
    cart.map(async (data) => {
      const productDet = event.companyProducts.find(a => a.id === data.product_id)
      cartItems.push({
        product_name: productDet ? productDet.product_name : "",
        product_id: data.product_id,
        qty: data.qty,
        price: Number(productDet.selling_price) ? Number(productDet.selling_price) : 0
      })
      const updatePayload = {
        TableName: "ProductsTable",
        Key: { id: data.product_id },
        UpdateExpression: 'set #qty = :qty',
        ExpressionAttributeValues: {
          ':qty': Number(productDet.qty) - data.qty
        },
        ExpressionAttributeNames: {
          '#qty': 'qty'
        },
        ReturnValues: 'ALL_NEW',
      };
      await dynamodb.update(updatePayload).promise();
    })
    const totalCost = cartItems.map(a => Number(a.price)).reduce((a, b) => a + b);
    const taxPrice = (5 * totalCost)/100;
    // 1 - created, 2- processing, 3- shipped, 4- delivered, 5-undelivered, 6-cancelled by user, 7-cancelled by company
    const payload = {
      id,
      user_id: event.user.id,
      restaurant_id,
      delivery_address,
      total_price: totalCost,
      tax_price: taxPrice,
      total_amount: totalCost + taxPrice,
      cart: cartItems,
      status: 1,
      date: now.toISOString(),
    };
    const result = await dynamodb
      .put({
        TableName: "OrdersTable",
        Item: payload,
      })
      .promise();

    const updatePayload = {
      TableName: "CartTable",
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
    await dynamodb.update(updatePayload).promise();
    await notificationService(1, JSON.stringify(result),event.user);
    return {
      statusCode: 201,
      body: JSON.stringify(result),
    };
  } catch (ex) {
    return {
      statusCode: 500,
      body: JSON.stringify(ex),
    };
  }
}

export const handler = middy(createOrder)
  .use(validateJWTToken);