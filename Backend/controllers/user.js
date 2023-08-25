const User = require('../models/user')

exports.login = async (req,res ,next)=>{
  const {name , email , password} = req.body;
  try{
    
    let user  = await User.create({
      name : name , 
      email : email,
      password  : password,
    })
    
    res.status(200).json(user) ;
  }catch(error){
    if (error.name === 'SequelizeUniqueConstraintError') {
      
      res.status(403).json({message : 'Email address is already in use.'});
    } else {
      // Other errors
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    }

  }

}

