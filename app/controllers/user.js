"use strict";
const mongoose = require("mongoose");
const Joi = require("joi");
const SHA256 = require("crypto-js/sha256");
const JWT = require("jsonwebtoken");

const User = require("../models/user");
const Recipient = require("../models/recipient");
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
  const user = await User.findById(req.value.params.userId);
  res.status(200).json(user);
};

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

exports.createUserRecipient = async (req, res, next) => {
  //Get user
  const { userId } = req.value.params;

  // Create new Recipient
  const newRecipient = new Recipient(req.value.body);
  const user = await User.findById(userId);
  newRecipient.owner = user;

  // Save Recipient
  await newRecipient.save();

  // Add Recipient to the user Recipient collection
  user.recipients.push(newRecipient); // MAXIMUM STACK EXCEEDED ERROR

  // Save user
  await user.save();
  res.status(201).json(newRecipient);
};

exports.getUserRecipients = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate("recipients");
  res.status(200).json(user);
};
