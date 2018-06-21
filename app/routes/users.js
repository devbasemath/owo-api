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

const passportLogin = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });


router
  .route("/oauth/google")
  .post(passport.authenticate("googleToken", { session: false }));
  
router
  .route("/")
  .get(passportJWT, controller.getAllUsers)
  .post(validateBody(schemas.userRegisterSchema), controller.createUser);

router
  .route("/authenticate")
  .post(
    validateBody(schemas.authenticationSchema),
    passport.authenticate("local", { session: false }),
    controller.authenticate
  );

router
  .route("/:userId")
  .get(
    validateParam(schemas.idSchema, "userId"),
    passportJWT,
    controller.getUserById
  )
  .put(
    validateParam(schemas.idSchema, "userId"),
    validateBody(schemas.userSchema),
    passportJWT,
    controller.replaceUser
  )
  .patch(
    validateParam(schemas.idSchema, "userId"),
    validateBody(schemas.userOptionalSchema),
    passportJWT,
    controller.updateUser
  )
  .delete(passportJWT, controller.deleteUser);

router
  .route("/:userId/recipients")
  .get(
    validateParam(schemas.idSchema, "userId"),
    passportJWT,
    controller.getUserRecipients
  )
  .post(
    validateParam(schemas.idSchema, "userId"),
    validateBody(schemas.userRecipientSchema),
    passportJWT,
    controller.createUserRecipient
  );

module.exports = router;
