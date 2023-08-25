const User = require('../models/user')

exports.login = async (req,res ,next)=>{
  console.log(req.body)
  const {name , email , password} = req.body;
  try{
    let user  = await User.create({
      name : name , 
      email : email,
      password  : password,
    })
    res.status(200).json(user) ;
  }catch(err){
    res.status(500).json({message : "internal server error"})
  }

}

