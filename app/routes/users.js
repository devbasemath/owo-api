"use strict";
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("../models/user");
const controller = require("../controllers/user");
const router = require("express-promise-router")();
const passport = require("passport");
const passportConf = require("../config/passport-config");

const {
  validateParam,
  validateBody,
  schemas
} = require("../helpers/route-helpers");

router
  .route("/")
  .get(controller.getAllUsers)
  .post(validateBody(schemas.userSchema), controller.createUser);

router
  .route("/authenticate")
  .post(validateBody(schemas.authenticationSchema), controller.authenticate);

// router.route("/register").post(controller.register);
// router.route("/login").post(controller.login);
router
  .route("/secret")
  .get(passport.authenticate("jwt", { session: false }), controller.secret);
// router
//   .route("/:email")
//   .get(validateParam(schemas.idSchema, "email"), controller.getUserByEmail);

router
  .route("/:userId")
  .get(validateParam(schemas.idSchema, "userId"), controller.getUserById)
  .put(
    validateParam(schemas.idSchema, "userId"),
    validateBody(schemas.userSchema),
    controller.replaceUser
  )
  .patch(
    validateParam(schemas.idSchema, "userId"),
    validateBody(schemas.userOptionalSchema),
    controller.updateUser
  )
  .delete(controller.deleteUser);

router
  .route("/:userId/invoices")
  .get(validateParam(schemas.idSchema, "userId"), controller.getUserInvoices)
  .post(
    validateParam(schemas.idSchema, "userId"),
    validateBody(schemas.userInvoiceSchema),
    controller.createUserInvoice
  );

module.exports = router;
