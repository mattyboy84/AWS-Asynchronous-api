
async function handler(event, context) {
  return {
    isAuthorized: true,
    context: {
      exampleKey: "exampleValue"
    }
  };
}

module.exports = {
  handler,
};
