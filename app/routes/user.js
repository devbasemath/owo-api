'use strict';
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User  = require('../models/user');
const controller  = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.route('/')
  .get(controller.getAllUsers)
  .post(controller.createUser);

router.route('/:email')
  .get(controller.getUserByEmail)
  .put(controller.updateUser)
  .delete(controller.deleteUser);

router.route('/:email/invoices')
  .get(controller.getUserInvoices)
  .post(controller.createUserInvoice);

module.exports = router;