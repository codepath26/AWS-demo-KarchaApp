const User = require("../models/appo-Details");

exports.getDetails = async (req, res, next) => {
  try {
    let data = await User.findAll();
    res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "user not able to create" });
  }
};
exports.postDetail = async (req, res, next) => {
 console.log(req.body)
 const { amount,description , category} = req.body;
  try {
    const newUser = await User.create({
     amount : amount,
     description : description,
      category : category,
    });
    res.status(201).json(newUser); // Assuming you want to send the created user back
  } catch (err) {
    res.status(500).json({message : "internal server error"}); 
  }
};
exports.deletDetail = async (req,res,next)=>{
  const listId = req.params.id;

  try{
   const user1 = await User.findOne({where :{id : listId}});
    user1.destroy();
    return res.status(200).json({message : "data deleted successfully"})
  }catch(error){
    return res.status(500).json({error : "Error Deleting data"})
  }
}
exports.updateDetail = async(req,res,next)=>{
  const listtId = req.params.id
  const updatedData =req.body;
  try{
    let updated = await User.updateByPk(listtId);
    res.status(200).json(updated);
  }catch(err){
    res.status(500).json({err : "Error Updating data"})
  }
}

exports.getDetailsbyId = async(req,res)=>{
  let getId = req.params.id;
  try{
   let getresult = await User.findOne({where :{id : getId}})
   res.status(200).json(getresult);
  }catch(err){
    res.status(500).json({err : "Error getting data"})
  }

}
