const { putItem } = require('./utils/DynamoDBUtils')

const {
  RESULT_TABLE_NAME,
  RESULT_TABLE_TTL_MINUTES,
} = require('./utils/config');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function handler(event, context) {
  console.log(JSON.stringify(event));

  const batchItemFailures = [];

  const { Records } = event;
  await Promise.all(Records.map((record) => (async () => {
    const { messageId, body } = record;
    try {
      const messageBody = JSON.parse(body);

      /*


      */
      await sleep((Math.random() * 8000) + 2000);
      /*


      */

      const date = new Date();
      date.setMinutes(date.getMinutes() + RESULT_TABLE_TTL_MINUTES);
      const ttl = ((date.getTime() / 1000).toFixed()).toString();

      const putItemResponse = await putItem({
        tableName: RESULT_TABLE_NAME,
        item: {
          MessageId: messageId,
          Status: 'FINISHED',
          ttl: ttl,
        }
      });
      console.log(JSON.stringify(putItemResponse, null, 2));
    } catch (err) {
      console.error(err);
      batchItemFailures.push({ itemIdentifier: messageId });
    }
  })()));

  console.log(JSON.stringify(batchItemFailures, null, 2));
  if (batchItemFailures.length > 0) {
    return batchItemFailures;
  }
}

module.exports = {
  handler,
};
