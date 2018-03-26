"use strict";
var mongoose = require('mongoose'),
  Invoice = mongoose.model('Invoice');

exports.createInvoice = function(req, res) {
  var invoice = new Invoice();
    invoice.invoiceid = req.body.invoiceid;
    invoice.clientname = req.body.clientname;
    invoice.save((err, createdInvoice) => {
      if(err) {
        res.send(err);
      }
      res.json({
        message: 'Invoice was saved successfully',
        data: res.json(createdInvoice)
      });
    })
};

exports.getAllInvoices = function(req, res) {
  Invoice.find((err, invoices) => {
    if(err) {
      res.send(err);
    }
    res.json(invoices)
  });
};

exports.getInvoiceByInvoiceId = function(req, res) {
  Invoice.find(
    {invoiceid : req.params.invoiceid},
    (err, invoice) => {
      if(err) {
        res.send(err);
      }
      res.json(invoice)
    }
  );
};
exports.updateInvoice = function(req, res) {
  Invoice.findOneAndUpdate(
    {invoiceid : req.params.invoiceid},
    req.body,
    {new: true},
    (err, invoice) => {
      if(err) {
        res.send(err);
      }
      res.json(invoice)
    }
  );
};

exports.deleteInvoice = function(req, res) {
  Invoice.remove(
    {invoiceid : req.params.invoiceid},
    (err, invoice) => {
      if(err) {
        res.send(err);
      }
      res.json('invoice deleted successfully');
    }
  );
};
