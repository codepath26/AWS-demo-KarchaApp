const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login');
const sequelize = require('./utils/database');
const User = require('./models/user');
const app = express()


app.use(cors());
const port = 3000
app.use(bodyParser.json());
sequelize.sync({force : true});
app.use(loginRoutes);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))