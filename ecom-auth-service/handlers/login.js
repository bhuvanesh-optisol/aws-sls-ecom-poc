const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { passwordEncryption } = require("../utils/passwordEncryptor");
const { token } = require("../utils/jwtGenerator");
async function login(event, context) {

  try {
    const { password, phone, country_code } = JSON.parse(event.body);
    const incrypt_password = await passwordEncryption(password);
    var params = {
      TableName: "UsersTable",
      ExpressionAttributeNames: {
        "#password": "password",
        "#phone": "phone",
        "#countryCode": "country_code",
        "#isDeleted": "is_deleted"
      },
      ExpressionAttributeValues: {
        ":phoneValue": phone,
        ":passwordValue": incrypt_password,
        ":isDeletedValue": false,
        ":countryCodeValue": country_code
      },
      FilterExpression: "#password = :passwordValue and #phone=:phoneValue and #isDeleted=:isDeletedValue and #countryCode=:countryCodeValue",
    };
    const result = await dynamodb
      .scan(params)
      .promise();
    if (result.Items.length > 0) {
      const userDetail = result.Items[0];
      const loginToken = await token(result.Items[0])
      const response = {
        userDetail,
        loginToken
      }
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      };
    } else {
      const message = 'Please register to login'
      return {
        statusCode: 401,
        body: JSON.stringify(message)
      };
    }
  } catch (ex) {
    return {
      statusCode: 500,
      body: ex
    };
  }
}

export const handler = login;