function add(a, b) {
    return a + b
}
function sub(a, b) {
    return a - b
}
module.exports={
    add,
    sub,
} // this is how we export modules in nodejs
//or exports.add=add(a,b)=>a+b