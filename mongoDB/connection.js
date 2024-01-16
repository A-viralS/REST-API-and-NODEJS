const mongoose=require('mongoose');
mongoose.set("strictQuery",true)
async function connectMondoDb(url){
    return mongoose.connect(url)
}
module.exports={connectMondoDb};