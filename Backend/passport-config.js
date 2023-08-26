const { authenticate } = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
function initialize(passport, getUserByEmail) {
  console.log("this1")
  const authenticateUser = async (email, password, done) => {
    console.log("this2")
    const user = getUserByEmail(email);
    if (user === null) {
      console.log("this3")
      return done(null, false, { message: " no user with that email" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        console.log("this4")
        return done(null, user);
      } else {
        console.log("this5")
        return done(null, flase, { message: " password incorrect" });
      }
    } catch (err) {
      console.log("this5")
      return done(err);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  console.log("this6")
  passport.serializeUser((user, done) => {done(null, user.id);});
  passport.deserializeUser((user, done) => {});
}
module.exports = initialize;
