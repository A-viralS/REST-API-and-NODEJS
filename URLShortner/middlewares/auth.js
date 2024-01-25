const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    console.log('headers',req.headers);
  const userUid = req.headers['authorization']
  console.log('headers',req.headers);


  if (!userUid) {
    console.log('no userUid');
    return res.redirect("/user/login");}
    const token= userUid.split('Bearer ')[1];
  const user = getUser(token);

  if (!user) {
    console.log('no user found by userUid');
    return res.redirect("/user/login");}

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
    console.log('headers',req.headers);
    const userUid = req.headers['authorization']
    const token= userUid.split('Bearer ')[1];
  const user = getUser(token);
  
  req.user = user;
  next(); 
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};