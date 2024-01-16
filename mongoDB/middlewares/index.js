const fs=require('fs')
function logReqRes(filename){
    return (req,res,next)=>{
        
            console.log('hello from middleware 1 ');
            fs.appendFile(
                filename,
                `\n${Date.now()}:${req.ip} ${req.method}: ${req.path}`,(err,data)=>{
                
                next();//continues to next function normally otherwise it will just hold the req nad code will not proceed 
            });
        
           
         
    }
}
module.exports= {logReqRes};