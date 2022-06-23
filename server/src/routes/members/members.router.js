const express = require('express');

const {
  httpAddNewMember,
  httpEditMember,
  httpGetOneMemberByName,
  httpGetAllMembers,
  httpGetOneMemberById,
} = require('./members.controller');

const membersRouter = express.Router();

membersRouter.get('/member', httpGetOneMemberByName)
membersRouter.get('/', httpGetAllMembers);
membersRouter.get('/:id', httpGetOneMemberById)
membersRouter.post('/', httpAddNewMember);
membersRouter.put('/', httpEditMember)

module.exports = membersRouter;