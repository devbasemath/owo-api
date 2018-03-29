"use strict";
const mongoose = require("mongoose");
const Joi = require("joi");
const User = mongoose.model("user");
const Invoice = mongoose.model("invoice");
const SHA256 = require("crypto-js/sha256");
const hash = password => {
  return SHA256(password);
};

exports.createUser = async (req, res, next) => {
  let newUser = new User(req.value.body);
  newUser.password = SHA256(req.value.body.password);
  const user = await newUser.save();
  res.status(201).json(user);
};

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json(users);
};

exports.getUserById = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  res.status(200).json(user);
};

// exports.getUserByEmail = async (req, res, next) => {
//   const result = req.value.params;
//   console.log(result);
//   const { email } = req.params;
//   const user = await User.find({ email: req.value.params.email });
//   res.status(200).json(user);
// };

exports.replaceUser = async (req, res, next) => {
  const { userId } = req.value.params;
  let newUser = req.value.body;
  newUser.password = SHA256(req.value.body.password);
  const user = await User.findByIdAndUpdate(userId, newUser);
  res.status(200).json({ success: true });
};

exports.updateUser = async (req, res, next) => {
  const { userId } = req.value.params;
  let newUser = req.value.body;
  newUser.password = SHA256(req.value.body.password);
  const user = await User.findByIdAndUpdate(userId, newUser);
  res.status(200).json({ success: true });
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.value.params;
  const user = await User.findByIdAndRemove(userId);
  res.status(200).json("user deleted successfully");
};

exports.authenticate = async (req, res) => {
  const { email } = req.body.email;
  const matchingUsers = await User.find(email);
  res
    .status(200)
    .json({ success: matchingUsers[0].password == SHA256(req.body.password) });
};

exports.createUserInvoice = async (req, res, next) => {
  //Get user
  const { userId } = req.value.params;

  // Create new invoice
  const newInvoice = new Invoice(req.value.body);
  const user = await User.findById(userId);
  newInvoice.owner = user;

  // Save invoice
  await newInvoice.save();

  // Add invoice to the user invoice collection
  // user.invoices.push(newInvoice); // MAXIMUM STACK EXCEEDED ERROR
  user.invoices.push({
    _id: newInvoice._id,
    invoiceid: newInvoice.invoiceid,
    clientname: newInvoice.clientname
  });

  // Save user
  await user.save();
  res.status(201).json(newInvoice);
};

exports.getUserInvoices = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate("invoices");
  res.status(200).json(user);
};
