"use strict";
const mongoose = require("mongoose");
const Joi = require("joi");
const SHA256 = require("crypto-js/sha256");
const JWT = require("jsonwebtoken");

const User = require("../models/user");
const Invoice = require("../models/invoice");
const { JWT_SECRET } = require("../config");

const hash = password => {
  return SHA256(password);
};

const signToken = user => {
  return JWT.sign(
    {
      iss: "Socx",
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    JWT_SECRET
  );
};

exports.createUser = async (req, res, next) => {
  const { email, password } = req.value.body;
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.status(404).json({ error: "Email already exists" });
  }
  const newUser = new User(req.value.body);
  const user = await newUser.save();

  const token = signToken(newUser);
  res.status(201).json({ token });
};

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json(users);
};

exports.getUserById = async (req, res, next) => {
  // const { userId } = req.params;
  const user = await User.findById(req.value.params.userId);
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
  const newUser = req.value.body;
  const user = await User.findByIdAndUpdate(userId, newUser);
  res.status(200).json({ success: true });
};

exports.updateUser = async (req, res, next) => {
  const { userId } = req.value.params;
  const newUser = req.value.body;
  const user = await User.findByIdAndUpdate(userId, newUser);
  res.status(200).json({ success: true });
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.value.params;
  const user = await User.findByIdAndRemove(userId);
  res.status(200).json("user deleted successfully");
};

exports.authenticate = async (req, res, next) => {
  const token = signToken(req.user);
  res.status(200).json({ token });
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
  user.invoices.push(newInvoice); // MAXIMUM STACK EXCEEDED ERROR
  // user.invoices.push({
  //   _id: newInvoice._id,
  //   invoiceid: newInvoice.invoiceid,
  //   clientname: newInvoice.clientname
  // });

  // Save user
  await user.save();
  res.status(201).json(newInvoice);
};

exports.getUserInvoices = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate("invoices");
  res.status(200).json(user);
};
