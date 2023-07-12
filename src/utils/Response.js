async function JSONresponse(statusCode, headers, body) {

  return {
    statusCode,
    headers: {...headers},
    body: JSON.stringify(body, null, 2),
  }
}

module.exports = {
  JSONresponse,
};