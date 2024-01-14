const http = require('http');
const fs = require('fs');
const url =require('url');//this parses the url into diffrent parts that can be extracted from the url like the path, query etc


const myServer = http.createServer((req,res)=>{
    console.log("new request received");
    if(req.url==='/favicon.ico'){return res.end();}
    const log=`${req.method} ${req.url}: New req is there\n`;
    const myUrl=url.parse(req.url,true);
    console.log(myUrl);
    fs.appendFile('log.txt',log,(err,data)=>{ 
        switch(myUrl.pathname){
            case '/':res.end("home page");
            break
            case '/about':
                const username=myUrl.query.myname;
            res.end("hey you are "+ username);
            break
            default:res.end("404 page not found");
            case '/signup':
                if(req.method=="GET")res.end("this is a sing up form page");
                else if (req.method=="POST")
                //DB code
            res.end("you have signed up successfully")

        };})

    
   
});//createServer() creates the server
// req has the info about the requester like the IP address, all the data etc and res is the response that we send back to the requester

// to run a server we need a port to listen to
myServer.listen(8000,()=>console.log("server started!"));