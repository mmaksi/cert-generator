const {
  findAdminByName,
  registerAdmin,
  signInAdmin,
  authenticateUser,
  authorizeUser
} = require("../../models/admins.model");

const httpRegisterAdmin = async (req, res) => {
  const admin = req.body;
  if (!admin.username || !admin.password) {
    return res.status(400).json({ error: "required fields are missing" });
  } else {
    const existedAdmin = await findAdminByName(admin);
    if (!existedAdmin) {
      await registerAdmin(admin);
      return res.status(201).json(admin);
    } else {
      return res.status(403).json({
        error: "only one admin is allowed to register and it already exists",
      });
    }
  }
};

const httpSignInAdmin = async (req, res) => {
  const admin = req.body;
  const { username, password } = admin;
  // checking the validity of admin object keys
  if (!username || !password)
    return res.status(400).json({ error: "required fields are missing" });

  // checking authentication
  const isAuthenticated = await authenticateUser(admin)

  // authorization
  if (isAuthenticated) {
    const jwtAccessToken = authorizeUser(admin)
    return res.status(200).json({token: jwtAccessToken});
  }
  return res.status(401).json({ error: "wrong username or password" })
};

module.exports = { httpRegisterAdmin, httpSignInAdmin };
