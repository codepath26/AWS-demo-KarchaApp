


exports.forgotpassword = (req, res,next)=>{
  const {email} =req.body;
   console.log(email);
   req.email = email ;
   console.log(req.email);
   next();
}