import { Low , JSONFile } from 'lowdb'
import { v4 as uuid} from 'uuid'
const file = 'db.json';
const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();

db.data ||= {}  

const create = async (table, data, id = uuid()) => {
	try{
		await db.read();
		if(!db.data[table]){
			db.data[table] = {};
		}
		
		db.data[table][id] = data;
		await db.write();

	} catch (e) {
		return false;
	}
	return id;
};

const query = async (table, filters = {}) => {
	await db.read();
	let output = {};
	elementCycle: for(const key in db.data[table]){
		const element = db.data[table][key];
		filterCycle: 
		for(const filterKey in filters){
			if (!element[filterKey] || element[filterKey] != filters[filterKey]){
				continue elementCycle;
			}
		}
		output[key] = element;
	};
	return output;
}

const fetchSingle = async (table, id) => {
	await db.read();
	const result = db.data[table][id];
	// console.log(id);
	if(result === undefined){
		return false
	}
	return result;
}

const updateBatch = async (table, updateData, filters = {}) => {
		await db.read();
		elementCycle: for(const i in db.data[table]){
			const dataElement = db.data[table][i];
			filterCycle: 
			for(const filterKey in filters){
				if (!dataElement[filterKey] || dataElement[filterKey] != filters[filterKey]){
					continue elementCycle;
				}
			}
			for(const key in updateData){
				dataElement[key] = updateData[key];
			} 
		};
		await db.write();
}

const updateSingle = async (table, updateData, id) => {
		await db.read();
		db.data[table][id] = updateData;
		await db.write();
}

const deleteBatch = async (table, filters = {}) => {
	await db.read();
	let elementsToDelete = query(table, filters = {});
	for(const key in elementsToDelete){
		db.data[table].delete(key)
	}
	await db.write();
};

const deleteSingle = async (table, id) => {
	await db.read();
	delete db.data[table][id];
	await db.write();
};

const lowdbInterface = {
	create : create,
	query: query,
	fetchSingle: fetchSingle,
	updateBatch : updateBatch,
	updateSingle : updateSingle,
	deleteBatch : deleteBatch,
	deleteSingle : deleteSingle
};

export default lowdbInterface;