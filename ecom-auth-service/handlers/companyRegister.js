const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const {passwordEncryption} = require("../utils/passwordEncryptor");
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function register(event, context) {

  try {
    const { first_name, last_name, email, phone, country_code, password, company_name, company_description, company_code } = JSON.parse(event.body);
    const id = v4();
    const now = new Date();
    const incrypt_password = await passwordEncryption(password);
    const payload = {
      id,
      first_name,
      last_name,
      email,
      phone,
      country_code,
      company_name,
      is_deleted: false,
      company_description,
      company_code,
      password: incrypt_password,
      date: now.toISOString(),
    };
    const result = await dynamodb
    .put({
      TableName: "CompanyTable",
      Item: payload,
    })
    .promise();
  
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

export const handler = register;