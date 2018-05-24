"use strict";
const mongoose = require("mongoose");
const Recipient = require("../models/recipient");
const User = require("../models/user");
const Joi = require("joi");

exports.createRecipient = async (req, res, next) => {
  const owner = await User.findById(req.value.body.owner);
  const newRecipient = req.value.body;
  delete newRecipient.owner;

  const recipient = new Recipient(newRecipient);
  recipient.owner = owner;
  await recipient.save();

  owner.recipients.push(recipient);
  await owner.save();

  res.status(201).json(recipient);
};

exports.getAllRecipients = async (req, res, next) => {
  const recipients = await Recipient.find({});
  res.status(200).json(recipients);
};

exports.getRecipientByRecipientId = async (req, res, next) => {
  const { recipientId } = req.value.params.recipientId;
  const recipient = await Recipient.findById(req.value.params.recipientId);
  res.status(200).json(recipient);
};

exports.replaceRecipient = async (req, res, next) => {
  const { recipientId } = req.value.params;
  const newRecipient = req.value.body;
  const recipient = await Recipient.findByIdAndUpdate(recipientId, newRecipient);
  res.status(200).json({ success: true });
};

exports.updateRecipient = async (req, res, next) => {
  const { recipientId } = req.value.params;
  const newRecipient = req.value.body;
  const recipient = await Recipient.findByIdAndUpdate(recipientId, newRecipient);
  res.status(200).json({ success: true });
};

exports.deleteRecipient = async (req, res) => {
  const { recipientId } = req.value.params;
  const recipient = await Recipient.findById(recipientId);
  if (!recipient) {
    return res.status(404).json({ error: "Recipient does not exist" });
  }
  const ownerId = recipient.owner;
  const owner = await User.findById(ownerId);
  // Delete recipient
  await recipient.remove();
  // Remove from all user recipients
  owner.recipients.pull(recipient);
  // persist changes
  owner.save();
  res.status(200).json({ success: true });
};
