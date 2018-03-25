'use strict';
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Invoice  = require('../models/invoice');

module.exports = (app) => {

  app.route('/api/invoices')
  .post((req, res) => {
    var invoice = new Invoice();
    invoice.invoiceid = req.body.invoiceid;
    invoice.clientname = req.body.clientname;
    console.error(req.body);
    invoice.save((err) => {
      if(err) {
        res.send(err);
      }
      // res.send(200, {message: 'Invoice was saved successfully', data: req.body});
      res.json({message: 'Invoice was saved successfully'});
    })
  })

  .get((req, res) => {
    Invoice.find((err, invoices) => {
      if(err) {
        res.send(err);
      }
      res.json(invoices)
    });
  });

  
  
app.route('/api/invoices/:invoiceid')
  .get((req, res) => {
    Invoice.find({invoiceid : req.params.invoiceid}, (err, invoice) => {
      if(err) {
        res.send(err);
      }
      res.json(invoice)
    });
  })
  .patch((req, res) => {
    var invoice = new Invoice();
    invoice.invoiceid = req.body.invoiceid;
    invoice.clientname = req.body.clientname;
    Invoice.update({invoiceid : req.params.invoiceid}, (err, invoice) => {
      if(err) {
        res.send(err);
      }
      res.json(invoice)
    });
  });
}