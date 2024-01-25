const { getUser } = require("../service/auth");

async function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;//token is the name of the cookie
req.user=null;


  if (!tokenCookie) {
    return next();
}
const token= tokenCookie
  const user = getUser(token);

  

  req.user = user;
  next();
}

function restrictTo(roles = []) {
    return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes (req.user.role)) return res.end("UnAuthorized");
    return next();
    
    };
}
module.exports = {
  checkForAuthentication,
  restrictTo,
};