const express=require('express');
// const users=require('./MOCK_DATA.json'); //use this when no mongoose. 
const mongoose= require('mongoose')
const fs=require('fs');
const { stringify } = require('querystring');
const { markAsUntransferable } = require('worker_threads');
const app =express();
//middleware 
app.use(express.urlencoded({extended:false}));// this parses the data. if this not then the body will be undefined. these look for the headers which contain the type of data. if data is urlencoded then this will be used if not the succeeding code will follow 

//selfmade middleware
app.use((req,res,next)=>{
    console.log('hello from middleware 1 ');
    fs.appendFile('log.txt',`\n${Date.now()}:${req.ip} ${req.method}: ${req.path}`,(err,data)=>{
        req.myUserName="piyush.dev";//this property can be asscessed by middleware 2 and other middlewares too 
        next();//continues to next function normally otherwise it will just hold the req nad code will not proceed 
    });

   
} )
app.use((req,res,next)=>{
    console.log('hello from middleware 2 ');
    next();
} )

//Routes
app.get('/users', async(req,res)=>{
    const allDbUsers= await User.find({}); 
    const html= `
    <ul>
    ${allDbUsers.map(user=> `<li> ${user.first_name}- ${user.last_name}</li>`).join("")}
    </ul>
    `
    return res.send(html);
})
app.get('/api/users', async(req,res)=>{
    const allDbUsers= await User.find({}); 

    console.log('i am in get route ', req.myUserName);
    res.setHeader('X-myName',"aviral soni ");//custom header. start them with x 
    return res.json(allDbUsers);
})
app.route('/api/users/:id')
.get(async(req,res)=>{
    // const id = Number(req.params.id);
    // const user= users.find((user)=>user.id===id);
 const user= await User.findById(req.params.id);
    if (!user) return res.status(404).json({error:"user not found"})
    return res.json(user);

})//we have clubbed the request methods as they had same route info required. for the below two we will work with postman 
.patch(async(req,res)=>{
    //eidt with user id 
await User.findByIdAndUpdate(req.params.id,{last_name:"changed"});
    return res.json({status:"success"})
})
.delete(async(req,res)=>{
    //delete with user id 
    // const id =parseInt(req.params.id);
    // const index=users.findIndex((user)=>user.id===id);
    // const deletedUser=users.splice(index,1);
    // fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    //     return res.json({status:"success", id :users.length});
    // })
    const deletedUser= await User.findByIdAndDelete(req.params.id);
    return res.json({status:"success",deletedUser});

})

app.post("/api/users",async(req,res)=>{//async came after mongo 
    //thsi is to create a new user 
    const body=req.body; // this body has the data that comes from the front end as an input
    if(!body||!body.first_name||!body.last_name||!body.job_title||!body.gender||!body.email) return res.status(400).json({msg:"all fields are required"});
const result= await User.create({
    first_name:body.first_name,
    last_name:body.last_name,
    email:body.email,
    job_title:body.job_title,
    gender:body.gender,
  
   

})
console.log(result);
return res.status(201).json({msg:"user created"});


    //the below was used before mongodb 

    // users.push({id:users.length+1,...body});
    // fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    //     return res.status(201).json({status:"success", id :users.length});
    // })
    
})


const PORT=8000;

//CONNECTING MONGOOSE  
// the url comes from the terminal when  you start running mongodbsh
 mongoose.connect('mongodb://127.0.0.1:27017/mongooseTut')
 .then(()=>console.log("mongodb connected"))
 .catch(err=>console.log("mongo error", err));
//Schema
const userSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    job_title:{
        type:String,
    },
    gender:{
        type:String,
    },
 


}  ,
 {timestamps:true}
)
//MODAL
const User= mongoose.model("user",userSchema);
app.listen(PORT,()=>console.log(`server started at ${PORT}` ));
