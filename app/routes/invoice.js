'use strict';
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Invoice  = require('../models/invoice');
var controller  = require('../controllers/invoice');

module.exports = (app) => {
  app.route('/api/invoices')
    .get(controller.getAllInvoices)
    .post(controller.createInvoice);

  app.route('/api/invoices/:invoiceid')
    .get(controller.getInvoiceByInvoiceId)
    .put(controller.updateInvoice)
    .delete(controller.deleteInvoice);

}
