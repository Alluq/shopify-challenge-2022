import Item from "../schemas/itemSchema.js"
import validateGroup from "./groupValidator.js"

const validate = (data) => {

	//Checking if keys are the same
	const itemKeys = Object.keys(Item);
	const dataKeys = Object.keys(data);
	if(!itemKeys.every(element => dataKeys.includes(element))){
		console.log(Object.keys(data));
		console.log(Object.keys(Item));
		return false;
	}

	//Validating fields
	for(const field in data){
		if(!Item[field](data[field])){
			console.log(data[field]);
			console.log( typeof data[field]);
			return false;
		}
	}

	//Validating groups
	if(data['groups']){
		for(const i in data['groups']){
			validateGroup(i);
		}
	}
	return true;
}

export default validate;