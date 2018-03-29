'use strict';
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User  = require('../models/user');
const controller  = require('../controllers/user');
const router = require('express-promise-router')();

router.route('/')
  .get(controller.getAllUsers)
  .post(controller.createUser);

router.route('/authenticate')
  .post(controller.authenticate);

router.route('/:email')
  .get(controller.getUserByEmail)
  .put(controller.replaceUser)
  .patch(controller.updateUser)
  .delete(controller.deleteUser);

router.route('/:email/invoices')
  .get(controller.getUserInvoices)

router.route('/:id/invoices')
  .post(controller.createUserInvoice);

module.exports = router;