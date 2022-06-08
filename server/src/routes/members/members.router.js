const express = require('express');

const {
  httpAddNewMember,
  httpEditMember,
  httpGetOneMemberByName,
  httpGetAllMembers,
  httpGetOneMemberById,
  httpRegisterMember,
  httpSignInMember
} = require('./members.controller');

const usersRouter = express.Router();

usersRouter.post('/', httpAddNewMember);
usersRouter.put('/', httpEditMember)
usersRouter.get('/member', httpGetOneMemberByName)
usersRouter.get('/', httpGetAllMembers);
usersRouter.get('/:id', httpGetOneMemberById)
usersRouter.post('/signup', httpRegisterMember)
usersRouter.get('/signin', httpSignInMember)

module.exports = usersRouter;