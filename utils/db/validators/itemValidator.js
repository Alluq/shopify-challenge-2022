import Item from "../schemas/itemSchema.js"

const validate = (data) => {
	const itemKeys = Object.keys(Item);
	const dataKeys = Object.keys(data);
	if(!itemKeys.every(element => dataKeys.includes(element))){
		console.log(Object.keys(data));
		console.log(Object.keys(Item));
		return false;
	}
	for(const field in data){
		if(!Item[field](data[field])){
			console.log(data[field]);
			console.log( typeof data[field]);
			return false;
		}
	}
	return true;
}

export default validate;