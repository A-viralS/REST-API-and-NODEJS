const express=require('express');
const users=require('./MOCK_DATA.json');
const fs=require('fs')
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
app.get('/users',(req,res)=>{
    const html= `
    <ul>
    ${users.map(user=> `<li> ${user.last_name}</li>`).join("")}
    </ul>
    `
    return res.send(html);
})
app.get('/api/users',(req,res)=>{
    console.log('i am in get route ', req.myUserName);
    res.setHeader('X-myName',"aviral soni ");//custom header. start them with x 
    return res.json(users);
})
app.route('/api/users/:id').get((req,res)=>{
    const id = Number(req.params.id);
    const user= users.find((user)=>user.id===id);
    return res.json(user);

})//we have clubbed the request methods as they had same route info required. for the below two we will work with postman 
.patch((req,res)=>{
    //eidt with user id 
    return res.json({status:"pending"})
})
.delete((req,res)=>{
    //delete with user id 
    const id =parseInt(req.params.id);
    const index=users.findIndex((user)=>user.id===id);
    const deletedUser=users.splice(index,1);
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status:"success", id :users.length});
    })
    return res.json({status:"success",deletedUser});

})

app.post("/api/users",(req,res)=>{
    //thsi is to create a new user 
    const body=req.body; // this body has the data that comes from the front end as an input
    users.push({id:users.length+1,...body});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status:"success", id :users.length});
    })
    
})


const PORT=8000;
app.listen(PORT,()=>console.log(`server started at ${PORT}` ));
