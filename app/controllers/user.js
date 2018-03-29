"use strict";
const mongoose = require('mongoose');
const Joi = require('joi');
const User = mongoose.model('user');
const Invoice = mongoose.model('invoice');
const SHA256 = require("crypto-js/sha256");
const hash = (password) => {
  return SHA256(password);
};

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

  exports.authenticate = async (req, res) => {
    const matchingUsers = await User.find({email : req.body.email});
    res.status(200).json({success: matchingUsers[0].password == SHA256(req.body.password)});
  };

  exports.createUserInvoice = async (req, res, next) => {
    //Get user
    const { id } = req.params;

    // Create new invoice
    const newInvoice = new Invoice(req.body);
    const user = await User.findById(id);
    newInvoice.owner = user;

    // Save invoice
    await newInvoice.save();

    // Add invoice to the user invoice collection
    // user.invoices.push(newInvoice); // MAXIMUM STACK EXCEEDED ERROR
    user.invoices.push({_id: newInvoice._id,
      invoiceid: newInvoice.invoiceid,
      clientname: newInvoice.clientname });

    // Save user
    await user.save();
    res.status(201).json(newInvoice);
  };

  exports.getUserInvoices = async (req, res, next) => {
    const user = await User.find({email : req.params.email}).populate('invoices');
    res.status(200).json(user);
  };