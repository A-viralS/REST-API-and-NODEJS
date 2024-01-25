const {v4: uuidv4} =require('uuid')
const User= require('../models/user')
const {setUser} = require('../service/auth')
async function handleUserSignup(req,res){
    const {fullName,email,password} =req.body;
   await User.create({
    fullName,
    email,
    password

   });
   
  return  res.redirect('/')

}
async function handleUserLogin(req,res){
    const {email,password}=req.body;
    const user = await User.findOne({email,password});
    if(!user){
        return res.render('login',{
            error:console.log("invalid email or password"),
           
        })
    }
   
const token = setUser(user);

    return res.json({token})
}
module.exports={
    handleUserSignup,
    handleUserLogin
}
