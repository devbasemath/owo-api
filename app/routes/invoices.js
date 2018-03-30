"use strict";
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Invoice = require("../models/invoice");
const controller = require("../controllers/invoice");
const router = require("express-promise-router")();

const {
  validateParam,
  validateBody,
  schemas
} = require("../helpers/route-helpers");

router
  .route("/")
  .get(controller.getAllInvoices)
  .post(validateBody(schemas.invoiceSchema), controller.createInvoice);

router
  .route("/:invoiceId")
  .get(
    validateParam(schemas.idSchema, "invoiceId"),
    controller.getInvoiceByInvoiceId
  )
  .put(
    validateParam(schemas.idSchema, "invoiceId"),
    validateBody(schemas.putInvoiceSchema),
    controller.replaceInvoice
  )
  .patch(
    validateParam(schemas.idSchema, "invoiceId"),
    validateBody(schemas.patchInvoiceSchema),
    controller.replaceInvoice
  )
  .delete(
    validateParam(schemas.idSchema, "invoiceId"),
    controller.deleteInvoice
  );

module.exports = router;
