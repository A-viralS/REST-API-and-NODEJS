const User= require('../models/user');
async function handleGetAllUsers(req,res){
    const allDbUsers= await User.find({}); 

    console.log('i am in get route ', req.myUserName);
    res.setHeader('X-myName',"aviral soni ");//custom header. start them with x 
    return res.json(allDbUsers);
}
async function handleGetUsersById(req,res){
    const user= await User.findById(req.params.id);
    if (!user) return res.status(404).json({error:"user not found"})
    return res.json(user);

    
}
async function handleUpdateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id,{last_name:"changed"});
    return res.json({status:"success"})
}
async function handleDeleteUserById(req,res){
    const deletedUser= await User.findByIdAndDelete(req.params.id);
    return res.json({status:"success",deletedUser});
}
async function handleCreateNewUser(req,res){
      //thsi is to create a new user 
      const body=req.body; // this body has the data that comes from the front end as an input
      if(!body||!body.first_name||!body.last_name||!body.job_title||!body.gender||!body.email) 
      return res.status(400).json({msg:"all fields are required"});
  const result= await User.create({
      first_name:body.first_name,
      last_name:body.last_name,
      email:body.email,
      job_title:body.job_title,
      gender:body.gender,
  })
  console.log(result);
  return res.status(201).json({msg:"user created", id:result._id});
}
module.exports ={
    handleGetAllUsers,
    handleGetUsersById,
    handleUpdateUserById,
    handleDeleteUserById,
handleCreateNewUser,

}