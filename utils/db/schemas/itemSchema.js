import arrayValidator from '../validators/arrayValidator.js'
import stringValidator from '../validators/stringValidator.js'


const Item = {
	groups: arrayValidator,
	code: stringValidator,
	title: stringValidator,
	description: stringValidator
}

export default Item;