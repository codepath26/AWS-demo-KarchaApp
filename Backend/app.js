if(process.env.MODE_ENV  !== 'production'){
  require('dotenv').config();
}
const express = require('express')
const port = 3000 
const flash = require('express-flash')
const  session = require("express-session")
const cors = require('cors')
const bodyParser = require('body-parser');
const passport = require('passport');

const bcrypt = require ("bcrypt")
const loginRoutes = require('./routes/login');
const sequelize = require('./utils/database');
const User = require('./models/user');
const app = express()

app.use(flash());
app.use(session({
  secret : process.env.SESSION_SECRET,
  resave : false , 
  saveUninitialized : false,
}))
app.use(passport.initialize());
app.use(passport.session())

app.use(cors());
// app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
sequelize.sync({force :false});
app.use(loginRoutes);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))