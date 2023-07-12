const { sendMessage } = require('./utils/SQSUtils');
const { putItem } = require('./utils/DynamoDBUtils');
const { JSONresponse } = require('./utils/Response');

const {
  INCOMING_QUEUE_URL,
  RESULT_TABLE_NAME,
} = require('./utils/config');

async function handler(event, context) {
  console.log(event);
  console.log(context);

  const { body = undefined } = event;
  console.log(`received body: ${body}`);
  if (body === undefined) {
    return await JSONresponse(
      400,
      { 'Content-Type': 'application/json' },
      undefined,
    )
  }

  try {

    const { MessageId } = await sendMessage({
      region: 'eu-west-2',
      queueUrl: INCOMING_QUEUE_URL,
      messageBody: JSON.stringify(body),
    });


    await putItem({
      tableName: RESULT_TABLE_NAME,
      item: {
        MessageId: MessageId,
        Status: 'QUEUED',
      }
    });

    const response = await JSONresponse(
      201,
      {
      'Content-Type': 'application/json'
      },
      {
        MessageId: MessageId,
        Status: 'QUEUED',
      },
      );
      
      console.log(`response: ${JSON.stringify(response, null, 2)}`);
      
      return response;
    } catch (err) {
      console.error(err);
      return await JSONresponse(
        500,
        { 'Content-Type': 'application/json' },
        undefined,
      );
    }
}

module.exports = {
  handler,
};
