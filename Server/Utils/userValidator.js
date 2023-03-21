const Ajv = require("ajv");
var ajv = new Ajv();
const validator = require("validator")

const UserValidator={
type:"object",
properties:{
        firstName:{type:"string",pattern:"^[a-zA-Z]+$"},
        lastName: {type:"string", pattern:"^[a-zA-Z]+$"},
        email:{"type":"string","pattern":"^[a-zA-Z0-9]+\@{1}[a-zA-Z0-9]+(.com){1}$"},
        password:{"type":"string","minLength":5}

},
required:["firstName", "lastName", "email", "password"],
additionalProperties:true
}

var Validator = ajv.compile(UserValidator);

module.exports = Validator;