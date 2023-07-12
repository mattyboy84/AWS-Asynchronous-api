const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');

async function putItem(params) {
  const { tableName, item, region = 'eu-west-2' } = params;
  const client = new DynamoDBClient({ region });
  const docClient = DynamoDBDocument.from(client);

  const result = await docClient.put({
    TableName: tableName,
    Item: item,
  });

  return result.$metadata.httpStatusCode;
}

async function getItem(params) {
  const { tableName, key, region = 'eu-west-2' } = params;
  const client = new DynamoDBClient({ region });
  const docClient = DynamoDBDocument.from(client);

  const result = await docClient.get({
    TableName: tableName,
    Key: key,
  });

  return result.Item || undefined;
}

module.exports = {
  putItem,
  getItem,
};
