'use strict';

const Promise = require('bluebird');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIAYIZ735V3JHSPUFNK',
  secretAccessKey: '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',
  region: 'localhost',
  endpoint: 'http://dynamodb-local:8000',
});
var dynamodbOfflineOptions = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  },
  isOffline = () => process.env.IS_OFFLINE;

var client = isOffline()
  ? new AWS.DynamoDB.DocumentClient(dynamodbOfflineOptions)
  : new AWS.DynamoDB.DocumentClient();

module.exports = (method, params) => {
  return Promise.fromCallback(cb => client[method](params, cb));
};
