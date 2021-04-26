'use strict';

var express = require('express');
var router = express.Router();
const db = require('../database/dynamodb');
const uuid = require('node-uuid');

var Promise = require('bluebird');

const DB_PREFIX = process.env.IS_OFFLINE ? 'dev' : process.env.DB_PREFIX;

router.get('/', async (req, res, next) => {
  res.send('Invoices Route');
});


// Create a new Invoice
router.post('/createInvoice', async (req, res) => {
  const {
    client,
    invoiceType,
    project,
    description,
    amount,
    quantity,
    addLine,
    addNote,
  } = req.body;

  // const InvoiceID = (Math.random() * 1000).toString();
  const InvoiceID = uuid();
  const docInvoice = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: DB_PREFIX + '-invoice',
    Item: {
      InvoiceID: InvoiceID,
      client: client,
      invoiceType: invoiceType,
      project: project,
      description: description,
      amount: amount,
      quantity: quantity,
      addLine: addLine,
      addNote: addNote,
    },
  };
  docInvoice.put(params, function (err, data) {
    if (err) {
      res.send({
        success: false,
        message: 'Error: Server error',
      });
    } else {
      console.log('data', data);
      const { Items } = data;
      res.send({
        success: true,
        message: 'Add Invoice',
        InvoiceID: InvoiceID,
      });
    }
  });
});

// Get all invoices
router.get('/getAllInvoices', (req, res, next) => {
  const docInvoice = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: DB_PREFIX + '-invoice',
  };
  docInvoice.scan(params, function (err, data) {
    if (err) {
      res.send({
        success: false,
        message: 'Error: Server error',
      });
    } else {
      const { Items } = data;
      res.send({
        success: true,
        message: 'Loaded invoices',
        clients: Items,
      });
    }
  });
});

// Get by id
router.get('/getAllInvoices', (req, res, next) => {
  const invoiceId = req.query.id;
  const docInvoice = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: DB_PREFIX + '-invoice',
    KeyConditionExpression: 'invoiceId = :i',
    ExpressionAttributeValues: {
      ':i': invoiceId,
    },
  };
  docInvoice.query(params, function (err, data) {
    if (err) {
      res.send({
        success: false,
        message: 'Error: Server error',
      });
    } else {
      console.log('data', data);
      const { Items } = data;
      res.send({
        success: true,
        message: 'Loaded invoices',
        clients: Items,
      });
    }
  });
});

// Update by id
router.patch('/updateInvoice', (req, res, next) => {
  const {
    client,
    invoiceType,
    project,
    description,
    amount,
    quantity,
    addLine,
    addNote,
  } = req.body;
  const invoiceId = req.query.id;
  const docInvoice = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: DB_PREFIX + '-invoice',
    Key: {
      invoiceId: invoiceId,
    },
    UpdateExpression:
      'set client = :c, invoiceType = :i, project = :p,description = :d, amount = :a,quantity = :q,addLine = :l, addNote = :n',
    ExpressionAttributeValues: {
      ':c': client,
      ':i': invoiceType,
      ':p': project,
      ':d': description,
      ':a': amount,
      ':q': quantity,
      ':l': addLine,
      ':n': addNote,
    },
    ReturnValues: 'UPDATED_NEW',
  };
  console.log({ client, invoiceType });
  console.log('updating invoice');
  docInvoice.update(params, function (err, data) {
    if (err) {
      res.send({
        success: false,
        message: 'Error: Server error',
      });
    } else {
      console.log('data', data);
      const { Items } = data;
      res.send({
        success: true,
        message: 'Updated clients',
        clients: Items,
      });
    }
  });
});

// delete by id
router.delete('/deleteInvoice', (req, res, next) => {
  const invoiceId = req.query.id;
  const docInvoice = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: DB_PREFIX + '-invoice',
    Key: {
      invoiceId: invoiceId,
    },
  };
  console.log('deleting item');
  docInvoice.delete(params, function (err, data) {
    if (err) {
      console.error(
        'Unable to delete invoices. Error JSON:',
        JSON.stringify(err, null, 2)
      );
      res.send({
        success: false,
        message: 'Error: Server error',
      });
    } else {
      console.log('deleted');
      res.send({
        success: true,
        message: 'Deleted invoice',
      });
    }
  });
});

module.exports = router;
