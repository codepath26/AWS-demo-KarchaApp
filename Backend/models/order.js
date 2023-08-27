const sequelize = require('../utils/database')
const {DataTypes} = require('sequelize')

const Order = sequelize.define('order',{
  id : {
    type : DataTypes.INTEGER,
    allowIncrement : true,
    allowNull : false,
    primaryKey : true ,
    
  },
  pamentId : DataTypes.STRING,
  orderId : DataTypes.STRING,
  status : DataTypes.STRING,
})


module.exports = Order;