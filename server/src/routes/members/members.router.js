const express = require('express');
const jwt = require("jsonwebtoken");
const {
  httpAddNewMember,
  httpEditMember,
  httpGetOneMemberByName,
  httpGetAllMembers,
  httpGetOneMemberById,
} = require('./members.controller');

const membersRouter = express.Router();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "no authorization header" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) return res.status(403).json(error);
    req.user = user;
    next();
  });
};

membersRouter.get('/member', httpGetOneMemberByName)
membersRouter.get('/:id', httpGetOneMemberById)

membersRouter.get('/', authenticateToken, httpGetAllMembers);
membersRouter.post('/', authenticateToken, httpAddNewMember);
membersRouter.put('/', authenticateToken, httpEditMember)


module.exports = membersRouter;