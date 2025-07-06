const {validateAuthRegister, validateAuthLogin} = require("./validateAuth.js")

const res = validateAuthRegister({username: "mikug",email: "miku@gm",password:"kukung"})
console.log(res)
