const Sequlize = require('sequelize')
 const sequelize = new Sequlize('kharcha' , 'root' , 'Parth@Sagar26',{
  dialect : 'mysql',
  host : 'localhost'
 })

 module.exports = sequelize ; 