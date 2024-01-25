const jwt= require('jsonwebtoken')
const secret='secret'

function setUser( user) {
  const payload={
    _id:user.id,
    email:user.email,

  }
  return jwt.sign(payload, secret)

 //or 
//   return jwt.sign(url,secret)
}

function getUser(token ) {
    if(!token) return null
console.log('jwyverify: ',jwt.verify(token,secret));
  return jwt.verify(token,secret)
}

module.exports = {
  setUser,
  getUser,
};