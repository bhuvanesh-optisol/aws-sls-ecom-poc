const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { notificationService } = require("../services/notification");

async function notifyProducts(event, context) {

  try {
    let productList;
    var params = {
      TableName: "ProductsTable",
      ExpressionAttributeNames: {
        "#is_available": "is_available",
        "#isDeleted": "is_deleted"
      },
      ExpressionAttributeValues: {
        ":is_available": true,
        ":isDeletedValue": false,
      },
      FilterExpression: "#is_available=:is_available and #isDeleted=:isDeletedValue",
    };
    const result = await dynamodb
      .scan(params)
      .promise();
    productList = result.Items;
    await Promise.all(productList.map(async (product) => {
      try {
        const result1= await dynamodb
        .get({
          TableName: "CompanyTable",
          Key: { id: "a84dba49-7696-44d3-92ae-1b8015ac9321" }
        })
        .promise();
        product.user = result1.Item;
      } catch (ex) {
        console.log('ex', ex)
      }
    }))
    console.log('productList', productList)
    await Promise.all(productList.map(async (product) => {
      try {
        await notificationService(Number(product.qty), product);
      } catch (ex) {
        console.log('ex', ex)
      }
    }))
  } catch (ex) {
    console.log(ex)
    return {
      statusCode: 500,
      body: JSON.stringify(ex),
    };
  }
}

export const handler = notifyProducts;