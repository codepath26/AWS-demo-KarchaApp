const express = require("express");
const auth = require('../controllers/auth');
const router = express.Router();
<<<<<<< HEAD
const loginCon = require("../controllers/user");;
=======
const loginCon = require("../controllers/user");
const sendEmail = require("../controllers/index");
const passCon = require("../controllers/passCon");
>>>>>>> 02969df3ac8ead5d2a4f8e72228272266c8683e6
router.post("/user/signup", loginCon.signup);
// router.get('/user/login',loginCon.login);
// router.post('/user/login',loginCon.loginvalidate);
// router.get('/user/login',loginCon.loginget);
router.post("/user/login", loginCon.logincheck);


<<<<<<< HEAD

=======
//forgot password

router.post('/user/called/password/forgotpassword',passCon.forgotpassword,sendEmail.sendEmail.emailSent)
>>>>>>> 02969df3ac8ead5d2a4f8e72228272266c8683e6

module.exports = router;
