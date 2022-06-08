const express = require('express');
const authRouter = require('./authentication/auth.router');

const usersRouter = require('./members/members.router');

const api = express.Router();

api.use('/members', usersRouter);
api.use('/auth', authRouter)

module.exports = api;