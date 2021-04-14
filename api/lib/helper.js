'use strict';

var Promise = require('bluebird'),
  db = require('../database/dynamodb');

const DB_PREFIX = process.env.IS_OFFLINE ? 'dev' : process.env.DB_PREFIX;

function getInvoice(id) {
  return db('query', {
    TableName: DB_PREFIX + '-invoice',
    KeyConditionExpression: '#id = :id',
    ExpressionAttributeValues: {
      ':id': id,
    },
    ExpressionAttributeNames: {
      '#id': 'id',
    },
  });
}

function getAllInvoices() {
  return db('scan', {
    TableName: DB_PREFIX + '-invoice',
  });
}

function createInvoice(data) {
  return db('put', {
    TableName: DB_PREFIX + '-invoice',
    Item: {
      id: data.id,
      client: data.client,
      invoiceType: data.invoiceType,
      project: data.project,
      description: data.description,
      amount: data.amount,
      quantity: data.quantity,
      addLine: data.addLine,
      addNote: data.addNote,
      isCompleted: data.isCompleted,
    },
  });
}

function updateInvoice(data) {
  return db('update', {
    TableName: DB_PREFIX + '-invoice',
    Key: {
      id: data.id,
    },
    UpdateExpression:
      'set client = :client, invoiceType = :invoiceType, project = :project, description = :description, amount = :amount, quantity = :quantity',
    ExpressionAttributeValues: {
      ':client': data.client,
      ':invoiceType': data.invoiceType,
      ':project': data.project,
      ':description': data.description,
      ':amount': data.amount,
      ':quantity': data.quantity,
    },
  });
}

function updateInvoiceStatus(data) {
  return db('update', {
    TableName: DB_PREFIX + '-invoice',
    Key: {
      id: data.id,
    },
    UpdateExpression: 'set isCompleted = :isCompleted',
    ExpressionAttributeValues: {
      ':isCompleted': data.isCompleted,
    },
  });
}

function deleteInvoice(params) {
  return db('delete', {
    TableName: DB_PREFIX + '-invoice',
    Key: {
      id: params.id,
    },
  });
}

module.exports = {
  getInvoice: getInvoice,
  getAllInvoices: getAllInvoices,
  updateInvoice: updateInvoice,
  updateInvoiceStatus: updateInvoiceStatus,
  createInvoice: createInvoice,
  deleteInvoice: deleteInvoice,
};
