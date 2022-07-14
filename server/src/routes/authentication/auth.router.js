const express = require("express");

const { httpRegisterAdmin, httpSignInAdmin } = require("./auth.controller");

const authRouter = express.Router();

// authRouter.post("/register", httpRegisterAdmin);
authRouter.post("/signin", httpSignInAdmin);

module.exports = authRouter;
