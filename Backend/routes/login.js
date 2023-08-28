const express = require("express");
const auth = require('../controllers/auth');
const router = express.Router();
const loginCon = require("../controllers/user");
const sendEmail = require("../controllers/index");
const passCon = require("../controllers/passCon");
router.post("/user/signup", loginCon.signup);
// router.get('/user/login',loginCon.login);
// router.post('/user/login',loginCon.loginvalidate);
// router.get('/user/login',loginCon.loginget);
router.post("/user/login", loginCon.logincheck);


//forgot password

router.post('/user/called/password/forgotpassword',passCon.forgotpassword,sendEmail.sendEmail.emailSent)

module.exports = router;
