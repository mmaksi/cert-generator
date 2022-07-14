const express = require('express');

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
  if (token == null) return res.status(401).json({ error: "no authentication header" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    console.log(user)
    if (error) return res.status(403).json(error);
    req.user = user;
    next();
  });
};

membersRouter.get('/member', httpGetOneMemberByName)
membersRouter.get('/', httpGetAllMembers);
membersRouter.get('/:id', httpGetOneMemberById)

membersRouter.post('/', authenticateToken, httpAddNewMember);
membersRouter.put('/', authenticateToken, httpEditMember)


module.exports = membersRouter;