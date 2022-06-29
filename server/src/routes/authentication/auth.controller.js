const {
  findAdminByName,
  registerAdmin,
  signInAdmin,
} = require("../../models/admins.model");

const httpRegisterAdmin = async (req, res) => {
  const admin = req.body;
  if (!admin.username || !admin.password) {
    return res
      .status(400)
      .json({ error: "required fields are missing" });
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
  if (!admin.username || !admin.password) {
    return res
      .status(400)
      .json({ error: "required fields are missing" });
  } else {
    const isAuthorized = await signInAdmin(admin);
    if (isAuthorized) {
      return res.status(200).json({ message: "authorized" });
    }
    return res.status(401).json({ error: "unauthorized" });
  }
};

module.exports = { httpRegisterAdmin, httpSignInAdmin };
