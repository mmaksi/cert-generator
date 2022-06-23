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

const membersRouter = express.Router();

membersRouter.get('/member', httpGetOneMemberByName)
membersRouter.get('/', httpGetAllMembers);
membersRouter.get('/:id', httpGetOneMemberById)
// membersRouter.get('/signin', httpSignInMember)
membersRouter.post('/', httpAddNewMember);
// membersRouter.post('/signup', httpRegisterMember)
membersRouter.put('/', httpEditMember)

module.exports = membersRouter;