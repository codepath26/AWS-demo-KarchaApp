const express = require('express')
const userRoutes = require('./routes/expense')
const sequelize = require('./utils/database');
const cors = require('cors')
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login');
const User = require('./models/user');
const Order = require('./models/order');
const Expense = require('./models/appo-Details');
const flash = require('express-flash');
const app = express()
app.use(bodyParser.json());   
const port = 9000 
app.use(cors());
User.hasMany(Expense)
Expense.belongsTo(User , { onDelete: 'CASCADE'})
User.hasMany(Order)
Order.belongsTo(User , { onDelete: 'CASCADE'});
app.use(userRoutes);
app.use(loginRoutes);
sequelize.sync({force :false});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))