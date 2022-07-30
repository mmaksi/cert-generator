const adminsDatabase = require("./admins.mongo");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);

const findAdminByName = async (admin) => {
  const adminUserName = admin.username;
  return await adminsDatabase.findOne({ username: adminUserName });
};

const registerAdmin = async (admin) => {
  const { username, password } = admin;
  const hashedPassword = hashPassword(password);
  return await adminsDatabase.create([{ username, password: hashedPassword }]);
};

const authenticateUser = async (user) => {
  const { username, password: signInPassword } = user;
  // authenticate by querying the DB by name
  let existedAdmin = await findAdminByName(user);
  // authenticate password
  const existedHashedPassword = existedAdmin ? existedAdmin.password : "";
  const passwordIsMatched = checkMatchingPasswords(
    signInPassword,
    existedHashedPassword
  );
  if (existedAdmin && passwordIsMatched) return true
  return false
}

const authorizeUser = (userToAuthorize) => {
  const { username, password: signInPassword } = userToAuthorize;

  const user = { role: username };
  const ACCESS_TOKEN = jwt.sign(user, process.env.JWT_SECRET_KEY);
  return ACCESS_TOKEN;
}

/* Implementation details */
const hashPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

const checkMatchingPasswords = (signInPassword, existedHashedPassword) => {
  return bcrypt.compareSync(signInPassword, existedHashedPassword);
};

module.exports = {
  findAdminByName,
  registerAdmin,
  authenticateUser,
  authorizeUser,
};
