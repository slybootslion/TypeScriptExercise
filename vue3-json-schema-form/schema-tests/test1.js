var Ajv = require('ajv')
var ajv = new Ajv()
const schema = {
  type: 'string',
  minLength: 10
}
var validate = ajv.compile(schema)
var valid = validate('username')
if (!valid) console.log(validate.errors)
