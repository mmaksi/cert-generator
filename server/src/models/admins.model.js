const adminsDatabase = require("./admins.mongo");
const bcrypt = require("bcryptjs");
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

const signInAdmin = async (admin) => {
  const signInPassword = admin.password;
  let existedAdmin = await findAdminByName(admin);

  if (existedAdmin === null) {
    existedAdmin = {
      username: ".",
      password: ".",
    };
  }

  const existedHashedPassword = existedAdmin.password;

  const passwordIsMatched = checkMatchingPasswords(
    signInPassword,
    existedHashedPassword
  );

  if (existedAdmin === null || !passwordIsMatched) {
    return false;
  } else {
    return true;
  }
};

/* Implementation details */
const hashPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

const checkMatchingPasswords = (
  signInPassword = "",
  existedHashedPassword = ""
) => {
  return bcrypt.compareSync(signInPassword, existedHashedPassword);
};

module.exports = { findAdminByName, registerAdmin, signInAdmin };
