# AWS-Asynchronous-api

Implementation of an asynchronous AWS API using SQS to buffer & batch requests with dynamo as a central store for the events, their status and their result. The `processFileFunction` artificially pauses for 2 - 8 seconds to simulate processing with message.  

![](/images/diagram.png)

## setup
Deploy the Stack - The API url will be Output from the stack.  
Make a POST request to: the `/StartQuery` endpoint with any body (it doens't validate the body) - You will recieve a response body like:  
```json
{
  "MessageId": "4b39d05e-1add-40fe-8c77-6255e5700522",
  "Status": "QUEUED"
}
```
Make a GET request to the `/QueryResults` endpoint with the `MessageId` query parameter - If the message is still in the QUEUED status then you will recieve:  
```json
{
  "MessageId": "4b39d05e-1add-40fe-8c77-6255e5700522",
  "Status": "QUEUED"
}
```
If The message is in the `FINISHED` status you will recieve  
```json
{
  "ttl": "1689212154",
  "Status": "FINISHED",
  "MessageId": "4b39d05e-1add-40fe-8c77-6255e5700522"
}
```
