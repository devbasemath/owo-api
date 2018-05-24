"use strict";
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Recipient = require("../models/recipient");
const controller = require("../controllers/recipient");
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
  .get(passportJWT, controller.getAllRecipients)
  .post(validateBody(schemas.recipientSchema), controller.createRecipient);

router
  .route("/:recipientId")
  .get(
    validateParam(schemas.idSchema, "recipientId"),
    passportJWT,
    controller.getRecipientByRecipientId
  )
  .put(
    validateParam(schemas.idSchema, "recipientId"),
    validateBody(schemas.putRecipientSchema),
    passportJWT,
    controller.replaceRecipient
  )
  .patch(
    validateParam(schemas.idSchema, "recipientId"),
    validateBody(schemas.patchRecipientSchema),
    passportJWT,
    controller.replaceRecipient
  )
  .delete(
    validateParam(schemas.idSchema, "recipientId"),
    passportJWT,
    controller.deleteRecipient
  );

module.exports = router;
