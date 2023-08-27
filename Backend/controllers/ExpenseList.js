require('dotenv').config(); 
const { where } = require("sequelize");
const User = require("../models/appo-Details");
const  Razorpay  = require('razorpay');
const jwt = require("jsonwebtoken");
const user1 = require("../models/user");
const Order = require("../models/order");
exports.getDetails = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const user = jwt.verify(token, "sdfssdf594846");
    const getuser = await user1.findByPk(user.userId);
    let data = await User.findAll({ where: { userId: user.userId } });
    res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "user not able to create" });
  }
};
exports.postDetail = async (req, res, next) => {
  const token = req.header("Authorization");
  const user = jwt.verify(token, "sdfssdf594846");
  const { amount, description, category } = req.body;
  try {
    const newUser = await User.create({
      amount: amount,
      description: description,
      category: category,
      userId: user.userId,
    });
    res.status(201).json(newUser); // Assuming you want to send the created user back
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};
exports.deletDetail = async (req, res, next) => {
  const listId = req.params.id;

  try {
    const user1 = await User.findOne({ where: { id: listId } });
    user1.destroy();
    return res.status(200).json({ message: "data deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error Deleting data" });
  }
};
exports.updateDetail = async (req, res, next) => {
  const listtId = req.params.id;
  const updatedData = req.body;
  try {
    let updated = await User.updateByPk(listtId);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ err: "Error Updating data" });
  }
};

exports.getDetailsbyId = async (req, res) => {
  let getId = req.params.id;
  try {
    let getresult = await User.findOne({ where: { id: getId } });
    res.status(200).json(getresult);
  } catch (err) {
    res.status(500).json({ err: "Error getting data" });
  }
};

exports.getPremium = async (req, res)=>{
  try{
    const token = req.header("Authorization");
    const user = jwt.verify(token, "sdfssdf594846");
    const user1 = await User.findByPk(user.userId);
    const rzp = new Razorpay({
      key_id : process.env.RAZORPAY_KEY_ID,
      key_secret :  process.env.RAZORPAY_KEY_SECRET,
    })
    const  amount = 25000;
    console.log('this')
    rzp.orders.create({amount , currency : "INR"} , (err,order)=>{
      if(err){
        console.log('Razorpay API error' ,err);
        return res.status(500).json({ message: "Error creating order" });
      }try{

        user1.createOrder({orderid : order.id ,status : 'PANDING'})
        return res.status(201).json({order , key_id: rzp.key_id})
        }catch(err){
         console.error("User order creation error : " , err )
          return res.status(500).json({ message: "Error creating user order" });
        }
    });
  }catch(err){
     console.error("Internal server error:", err);
    res.status(500).json({message : 'internal in Razorpay Api call'});
  }

}