const Sequlize = require('sequelize')
 const sequelize = new Sequlize('kharcha' , 'root' , 'Parth@Sagar26',{
  dialect : 'mysql',
  host : 'localhost',
  logging : false,
 })

 module.exports = sequelize ; 