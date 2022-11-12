const ResponseError = require("./responseError")

exports.wasProvided = (object, field) => {
    if(!object)
    {
        throw new ResponseError("Payload Error: " + field + " must be provided.", 400)
    }
}