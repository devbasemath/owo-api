'use strict';
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User  = require('../models/user');
const controller  = require('../controllers/user');

module.exports = (app) => {
  app.route('/api/users')
    .get(controller.getAllUsers)
    .post(controller.createUser);

  app.route('/api/users/:email')
    .get(controller.getUserByEmail)
    .put(controller.updateUser)
    .delete(controller.deleteUser);

  app.route('/api/users/:email/invoices')
    .get(controller.getUserInvoices)
    .post(controller.createUserInvoice);

}