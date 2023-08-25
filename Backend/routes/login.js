const express = require('express')
const router = express.Router();
const loginCon = require('../controllers/user')
router.post('/user/login',loginCon.login);
// router.get('/',loginCon.login);
// router.get('/',loginCon.login);


module.exports = router;