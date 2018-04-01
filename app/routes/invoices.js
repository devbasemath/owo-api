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
const passport = require("passport");

const passportJWT = passport.authenticate("jwt", { session: false });

router
  .route("/")
  .get(passportJWT, controller.getAllInvoices)
  .post(validateBody(schemas.invoiceSchema), controller.createInvoice);

router
  .route("/:invoiceId")
  .get(
    validateParam(schemas.idSchema, "invoiceId"),
    passportJWT,
    controller.getInvoiceByInvoiceId
  )
  .put(
    validateParam(schemas.idSchema, "invoiceId"),
    validateBody(schemas.putInvoiceSchema),
    passportJWT,
    controller.replaceInvoice
  )
  .patch(
    validateParam(schemas.idSchema, "invoiceId"),
    validateBody(schemas.patchInvoiceSchema),
    passportJWT,
    controller.replaceInvoice
  )
  .delete(
    validateParam(schemas.idSchema, "invoiceId"),
    passportJWT,
    controller.deleteInvoice
  );

module.exports = router;
