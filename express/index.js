const http=require('http');
const fs=require('fs');
const express=require('express');

const app = express();
app.get('/',(req,res)=>{
    const log=`${req.query.name} ${req.method}\n`;
    fs.appendFile('log.txt',log,(err,data)=>{
        if(err) throw err;
        console.log("data is appended");
        return  res.send('Hello you are '+ req.query.name);
    })
 
});
app.get('/about',(req,res)=>{
    return  res.send('Hello your query is '+ req.query.name);
 }); 
app.listen(8000,()=>console.log("servre started"));