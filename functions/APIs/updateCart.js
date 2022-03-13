"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// UpdateCart - Update quantity of a book in a customer's cart
exports.handler = (event, context, callback) => {
  
  if (event.source === "warmer") {
    return callback(null, "Lambda is warm");
  }
  
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,

    Key: {
      customerId: event.requestContext.identity.cognitoIdentityId,
      bookId: data.bookId
    },

    UpdateExpression: "SET quantity = :quantity",
    ExpressionAttributeValues: {
      ":quantity": data.quantity
    },
    ReturnValues: "ALL_NEW"
  };
 
  dynamoDb.update(params, (error, data) => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials" : true
    };

    // Return status code 500 on error
    if (error) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: error
      };
      callback(null, response);
      return;
    }

    // Return status code 200 on success
    const response = {
      statusCode: 200,
      headers: headers
    };
    callback(null, response);
  });
}   
