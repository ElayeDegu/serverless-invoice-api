'use strict';

let invoice = require('./lib/invoice');

module.exports.getAllInvoices = (event, context, callback) => {
  invoice.getAllInvoices(event, callback);
};

module.exports.createInvoice = (event, context, callback) => {
  invoice.createInvoice(event, callback);
};

module.exports.updateInvoice = (event, context, callback) => {
  invoice.updateInvoice(event, callback);
};

module.exports.updateInvoiceStatus = (event, context, callback) => {
  invoice.updateInvoiceStatus(event, callback);
};

module.exports.deleteInvoice = (event, context, callback) => {
  invoice.deleteInvoice(event, callback);
};
