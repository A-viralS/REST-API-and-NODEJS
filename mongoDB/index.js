const express=require('express');
const mongoose= require('mongoose')

const {connectMondoDb }=require('./connection')
const userRouter=require('./routes/user');
const {logReqRes} = require('./middlewares/index');
const app =express();
//middleware 
app.use(express.urlencoded({extended:false}));// this parses the data. if this not then the body will be undefined. these look for the headers which contain the type of data. if data is urlencoded then this will be used if not the succeeding code will follow 

// middleware
app.use(logReqRes('log.txt'));

//Routes
app.use("/api/users",userRouter);


//CONNECTING MONGOOSE   
connectMondoDb('mongodb://127.0.0.1:27017/mongooseTut').then(()=>console.log("mongodb connected"));

const PORT=8000;
app.listen(PORT,()=>console.log(`server started at ${PORT}` ));
