const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;//uid is the name of the cookie
  console.log('COOKIES',req.cookies);

  if (!userUid) {
    console.log('no userUid');
    return res.redirect("/user/login");}
  const user = getUser(userUid);

  if (!user) {
    console.log('no user found by userUid');
    return res.redirect("/user/login");}

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next(); 
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};