"use strict";
const mongoose = require("mongoose");
const Invoice = require("../models/invoice");
const User = require("../models/user");
const Joi = require("joi");

exports.createInvoice = async (req, res, next) => {
  const owner = await User.findById(req.value.body.owner);
  const newInvoice = req.value.body;
  delete newInvoice.owner;

  const invoice = new Invoice(newInvoice);
  invoice.owner = owner;
  await invoice.save();

  owner.invoices.push(invoice);
  await owner.save();

  res.status(201).json(invoice);
};

exports.getAllInvoices = async (req, res, next) => {
  const invoices = await Invoice.find({});
  res.status(200).json(invoices);
};

exports.getInvoiceByInvoiceId = async (req, res, next) => {
  const { invoiceId } = req.value.params.invoiceId;
  const invoice = await Invoice.findById(req.value.params.invoiceId);
  res.status(200).json(invoice);
};

exports.replaceInvoice = async (req, res, next) => {
  const { invoiceId } = req.value.params;
  const newInvoice = req.value.body;
  const invoice = await Invoice.findByIdAndUpdate(invoiceId, newInvoice);
  res.status(200).json({ success: true });
};

exports.updateInvoice = async (req, res, next) => {
  const { invoiceId } = req.value.params;
  const newInvoice = req.value.body;
  const invoice = await Invoice.findByIdAndUpdate(invoiceId, newInvoice);
  res.status(200).json({ success: true });
};

exports.deleteInvoice = async (req, res) => {
  const { invoiceId } = req.value.params;
  const invoice = await Invoice.findById(invoiceId);
  if (!invoice) {
    return res.status(404).json({ error: "Invoice does not exist" });
  }
  const ownerId = invoice.owner;
  const owner = await User.findById(ownerId);
  // Delete invoice
  await invoice.remove();
  // Remove from all user invoices
  owner.invoices.pull(invoice);
  // persist changes
  owner.save();
  res.status(200).json({ success: true });
};
