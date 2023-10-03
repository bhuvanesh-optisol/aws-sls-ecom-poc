const jwt = require('jsonwebtoken');
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const JWT_SECRET = "0a6b944d-d2fb-46fc-a85e-0295c986cd9f"


export const validateJWTToken = {
  before: async (handler, next) => {
    try {
      if (handler.event.headers.Authorization) {
        const [tokenType, token] = handler.event.headers.Authorization.split(' ');
        if (tokenType.toLowerCase() !== 'jwt') {
          return {
            statusCode: 403,
            message: "Invalid headers"
          }
        } else {
          const decoded = jwt.verify(token, JWT_SECRET);
          const { userId: id } = decoded.sub;
          let result = await dynamodb
            .get({
              TableName: "UsersTable",
              Key: { id }
            })
            .promise();
          const getUserLoginDetail = result.Item;
          if (getUserLoginDetail) {
            handler.event.user = getUserLoginDetail;
            if(handler.event.body) {
              const { restaurant_id } = JSON.parse(handler.event.body);
              if(restaurant_id) {
                var params = {
                  TableName: "ProductsTable",
                  ExpressionAttributeNames: {
                    "#restaurant_id": "restaurant_id"
                  },
                  ExpressionAttributeValues: {
                    ":restaurantIdValue": restaurant_id,
                  },
                  FilterExpression: "#restaurant_id=:restaurantIdValue",
                };
                const productsResult = await dynamodb
                  .scan(params)
                  .promise();
                handler.event.companyProducts = productsResult.Items
              }
            }
            next();
          } else {
            return {
              statusCode: 401,
              message: "UNAUTHORIZED"
            }
          }
        }
      } else {
        return {
          statusCode: 403,
          message: "Access forbidden"
        }
      }
    } catch (error) {
      return {
        statusCode: 401,
        message: "Unauthorized",
        body: error
      }
    }
  }
};

export const validateCompanyJWTToken = {
  before: async (handler, next) => {
    try {
      if (handler.event.headers.Authorization) {
        const [tokenType, token] = handler.event.headers.Authorization.split(' ');
        if (tokenType.toLowerCase() !== 'jwt') {
          return {
            statusCode: 403,
            message: "Invalid headers"
          }
        } else {
          const decoded = jwt.verify(token, JWT_SECRET);
          const { userId: id } = decoded.sub;
          let result = await dynamodb
            .get({
              TableName: "CompanyTable",
              Key: { id }
            })
            .promise();
          const getUserLoginDetail = result.Item;
          if (getUserLoginDetail) {
            handler.event.user = getUserLoginDetail;
          } else {
            return {
              statusCode: 401,
              message: "UNAUTHORIZED"
            }
          }
        }
        next();
      } else {
        return {
          statusCode: 403,
          message: "Access forbidden"
        }
      }
    } catch (error) {
      return {
        statusCode: 401,
        message: "Unauthorized",
        body: error
      }
    }
  }
};