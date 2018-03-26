"use strict";
var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Invoice = mongoose.model('Invoice'),
  SHA256 = require("crypto-js/sha256"),
  hash = (password) => {
    return SHA256(password);
  }

  exports.createUser = async (req, res, next) => {
    let newUser = new User(req.body);
    newUser.password = SHA256(req.body.password);
    const user = await newUser.save();
    res.status(201).json(user);
  };

  exports.getAllUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json(users);
  };

  exports.getUserByEmail = async (req, res, next) => {
    const { email } = req.params;
    const user = await User.find({email: req.params.email});
    res.status(200).json(user);
  };

  exports.replaceUser = async (req, res, next) => {
    const { email } = req.params;
    let newUser = req.body;
    newUser.password = SHA256(req.body.password);
    const user = await User.findOneAndUpdate(email, newUser);
    res.status(200).json({'success': true});
  };

  exports.updateUser= async (req, res, next) => {
    const { email } = req.params;
    let newUser = req.body;
    newUser.password = SHA256(req.body.password);
    const user = await User.findOneAndUpdate(email, newUser);
    res.status(200).json({'success': true});
  };

  exports.deleteUser = async (req, res) => {
    const user = await User.remove({email : req.params.email});
    res.status(200).json('user deleted successfully');
  };
  // exports.authenticate = (req, res) => {
  //   User.find(
  //     {email : req.params.email},
  //     (err, user) => {
  //       if(err) {
  //         res.send(err);
  //       }
  //       if(user.password === SHA256(req.params.password)) {
  //         res.json({authenticated: true});
  //       } else {
  //         res.json({authenticated: false});
  //       }
  //     }
  //   );
  // };

  exports.createUserInvoice = (req, res, next) => {
    const newInvoice = new Invoice(req.body);
    //Gte user
    const user = User.find({email : req.params.email});
    newInvoice.user = user;
    // Save invoice
    newInvoice.save();
    // Add invoice to the user invoice collection
    // user.invoices.push(newInvoice);
    console.log(user.invoices)
    console.log(newInvoice)
    // Save user
    // user.save();
    res.status(201).json(newInvoice);
  };

  exports.getUserInvoices = (req, res, next) => {
    const newInvoice = new Invoice(req.body);
    //Get user
    const user = User.find({email : req.params.email}).populate('Invoices');

    console.log(user);
    // newInvoice.user = user;
    // // Save invoice
    // newInvoice.save();
    // // Add invoice to the user invoice collection
    // user.invoices.push(newInvoice);
    // // Save user
    // user.save();
    // res.status(201).json(newInvoice);
  };