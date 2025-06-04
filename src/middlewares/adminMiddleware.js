const createError = require("../utils/createError")

module.exports const verifyAdmin = async (req, res, next) => {
  if(req.role === "admin") {
    return next()
  }else{
    next(createError(403,"Hanya admin yang boleh menggunakan fitur ini"))
  }
}
