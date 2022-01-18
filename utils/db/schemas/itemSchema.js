import objectValidator from '../validators/objectValidator.js'
import stringValidator from '../validators/stringValidator.js'


const Item = {
	groups: objectValidator,
	code: stringValidator,
	title: stringValidator,
	description: stringValidator
}

export default Item;