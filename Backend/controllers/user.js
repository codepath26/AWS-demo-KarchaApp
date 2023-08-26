const passport = require("passport");
const initialzePassport = require("../passport-config");
const User = require("../models/user");
const bcrypt = require("bcrypt");
exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  //  console.log(req.body)
  try {
    const Password = await bcrypt.hash(password, 10);
    let user = await User.create({
      name: name,
      email: email,
      password: Password,
    });

    res.status(200).json(user);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(403).json({ message: "Email address is already in use." });
    } else {
      // Other errors
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    }
  }
};
exports.logincheck = async (req, res) => {
  let email1 = req.body.email;
  let password1 = req.body.password;
  //  console.log(email1 , password1)
  let user = await User.findOne({ where: { email: email1 } });
  if (user) {
    const passwordMatch = await bcrypt.compare(password1, user.password);
    if (passwordMatch) {
      res.status(200).json({ message: "user loging successfully" });
    } else {
      res.status(401).json({ message: "You entered Wrong Passwprd" });
    }
  } else {
    res.status(404).json({ message: "user is not found" });
  }
};
