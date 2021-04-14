'use strict';

var helper = require('./helper'),
  response = require('./response');

module.exports.getAllInvoices = (event, cb) => {
  helper
    .getAllInvoices()
    .then(invoices => {
      cb(
        null,
        response.create(200, {
          result: invoices,
        })
      );
    })
    .catch(err => {
      cb(
        null,
        response.create(500, {
          err: err,
        })
      );
    });
};

module.exports.createInvoice = (event, cb) => {
  helper
    .createInvoice(JSON.parse(event.body))
    .then(result => {
      cb(null, response.create(201, {}));
    })
    .catch(err => {
      cb(
        null,
        response.create(500, {
          err: err,
        })
      );
    });
};

module.exports.updateInvoice = (event, cb) => {
  helper
    .updateInvoice(JSON.parse(event.body))
    .then(result => {
      cb(null, response.create(200, {}));
    })
    .catch(err => {
      cb(
        null,
        response.create(500, {
          err: err,
        })
      );
    });
};

module.exports.updateInvoiceStatus = (event, cb) => {
  helper
    .updateInvoiceStatus(JSON.parse(event.body))
    .then(result => {
      cb(null, response.create(200, {}));
    })
    .catch(err => {
      cb(
        null,
        response.create(500, {
          err: err,
        })
      );
    });
};

module.exports.deleteInvoice = (event, cb) => {
  helper
    .deleteInvoice(event.pathParameters)
    .then(result => {
      cb(null, response.create(200, {}));
    })
    .catch(err => {
      cb(
        null,
        response.create(500, {
          err: err,
        })
      );
    });
};
