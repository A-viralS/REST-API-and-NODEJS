const fs= require('fs');
//sync ... or blocking
const os =require('os');

console.log(os.cpus().length);
fs.writeFileSync('./test.txt',"Hello, You!"); //when we run node file.js in terminal it will create a file named test.txt and write Hello, You! in it. that great

//async or non-blocking
fs.writeFile('./test2.txt',"Hello, You, in async!",(err)=>{
    if(err){
        console.log(err);
    }
    console.log("File written successfully");
}); //when we run node file.js in terminal it will create a file named test.txt and write Hello, You! in it. that great
const result = fs.readFileSync('./contacts.txt','utf-8') // utf-8 is the standard encoding format of the file. it depends on what kind of file are you using like video or text or image etc 

console.log(result);

const result2 = fs.readFile('./contacts.txt','utf-8',(err,data)=>{
    if(err){
        console.log(err);
    }
    console.log(data);
});
 console.log(result2);
 fs.appendFileSync('./contacts.txt',"Hello, You!"); //when we run node file.js in terminal it will create a file named test.txt and write Hello, You! in it. that great
 console.log(fs.statSync('./contacts.txt'));