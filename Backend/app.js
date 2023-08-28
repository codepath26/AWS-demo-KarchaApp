const express = require('express')
const userRoutes = require('./routes/expense')
const sequelize = require('./utils/database');
const cors = require('cors')
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login');
const User = require('./models/user');
<<<<<<< HEAD
const ForgotPassword = require('./models/forgotpass');
const ForgotPasswordRoutes = require('./routes/changePass');
const Order = require('./models/order');
const Expense = require('./models/appo-Details');
=======
const Order = require('./models/order');
const Expense = require('./models/appo-Details');
const flash = require('express-flash');
>>>>>>> 02969df3ac8ead5d2a4f8e72228272266c8683e6
const app = express()
app.use(bodyParser.json());   
const port = 9000 
app.use(cors());
<<<<<<< HEAD
app.use(userRoutes);
app.use(loginRoutes);
app.use('/password', ForgotPasswordRoutes);
User.hasMany(Expense)
Expense.belongsTo(User , { onDelete: 'CASCADE'})
User.hasMany(Order)
Order.belongsTo(User , { onDelete: 'CASCADE'});
User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User ,{ onDelete: 'CASCADE'});
sequelize.sync();
=======
User.hasMany(Expense)
Expense.belongsTo(User , { onDelete: 'CASCADE'})
User.hasMany(Order)
Order.belongsTo(User , { onDelete: 'CASCADE'});
app.use(userRoutes);
app.use(loginRoutes);
sequelize.sync({force :false});
>>>>>>> 02969df3ac8ead5d2a4f8e72228272266c8683e6
app.listen(port, () => console.log(`Example app listening on port ${port}!`))