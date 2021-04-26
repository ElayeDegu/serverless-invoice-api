'use strict';

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }, null, 2),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
// 'use strict';

// let invoice = require('./lib/invoice');

// module.exports.getAllInvoices = (event, context, callback) => {
//   invoice.getAllInvoices(event, callback);
// };

// module.exports.createInvoice = (event, context, callback) => {
//   invoice.createInvoice(event, callback);
// };

// module.exports.updateInvoice = (event, context, callback) => {
//   invoice.updateInvoice(event, callback);
// };

// module.exports.updateInvoiceStatus = (event, context, callback) => {
//   invoice.updateInvoiceStatus(event, callback);
// };

// module.exports.deleteInvoice = (event, context, callback) => {
//   invoice.deleteInvoice(event, callback);
// };
