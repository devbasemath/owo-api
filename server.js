var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Invoice  = require('./app/models/invoice');
var helmet = require('helmet');

// Security; XSS Protection, anti-Clickingjacking
// Context-Security-Policy header etc
app.use(helmet());

// Configure app for bodyParser()
// Let us grab data form the body of a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up port for server to listen on
var port = process.env.PORT || 3000;

// Connect to DB
mongoose.connect('mongodb://localhost:27017/invoice');

//API Routes
var router = express.Router();
// Test Route
router.get('/', function(req, res) {
  res.json({message: 'Welcome to our API'});
});

// Router will all be prefixed with /api
app.use('/api', router);

//  MIDDLEWARE  -
router.use(function(req, res, next){
  console.log('Processing here...');
  next();
});

router.route('/invoices')
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

router.route('/invoices/:invoiceid')
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

//Fire up server
app.listen(port);

// Print friendly message to console
console.info('Server listening on port: ' + port)

