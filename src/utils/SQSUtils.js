const { SQS } = require("@aws-sdk/client-sqs");

async function sendMessage(params) {
    const { region, queueUrl, messageBody } = params;
    const client = new SQS({ region: "eu-west-2" });
    return await client.sendMessage({
        QueueUrl: queueUrl,
        MessageBody: messageBody,
    });

}

module.exports = {
    sendMessage,
};
