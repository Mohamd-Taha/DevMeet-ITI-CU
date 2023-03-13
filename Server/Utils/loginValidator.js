const Ajv = require("ajv");
var ajv = new Ajv();

let loginValidator={
type:"object",
properties:{
        email:{type:"string",pattern:"^[a-zA-Z0-9]+\@{1}[a-zA-Z0-9]+(.com){1}$"},
        password:{type:"string",minLength:5}

},
required:["email", "password"],
additionalProperties:false
}

var Validator = ajv.compile(loginValidator);

module.exports = Validator;