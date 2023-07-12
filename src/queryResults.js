const { getItem } = require('./utils/DynamoDBUtils')
const { JSONresponse } = require('./utils/Response');

const {
  RESULT_TABLE_NAME,
} = require('./utils/config');

async function handler(event, context) {
  console.log(event);
  console.log(context);

  const MessageId = event?.queryStringParameters?.MessageId;
  if (MessageId === undefined) {
    return await JSONresponse(
      400,
      { 'Content-Type': 'application/json' },
      undefined,
      )
    }
    
  console.log(`received request for MessageId: ${MessageId}`);
  const result = await getItem({
    tableName: RESULT_TABLE_NAME,
    key: {
      MessageId,
    }
  });
  console.log(`result query: ${result}`);

  return await JSONresponse(
    200,
    { 'Content-Type': 'application/json' },
    result,
  );
}

module.exports = {
  handler,
};
