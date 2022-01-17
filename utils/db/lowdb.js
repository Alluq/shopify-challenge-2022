import { Low , JSONFile } from 'lowdb'
const file = 'db.json';
const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();

db.data ||= {}  

const lowdbInterface = {
	create : async (table, data) => {
		try{

			if(!db.data[table]){
				db.data[table] = [];
			}

			db.data[table].push(data);
			await db.write();

		} catch (e) {
			return false;
		}
		return true;
	},											
	read: (table, filters = {}) => {
		return db.data[table].filter(dataElement => {
			for(const filterKey in filters){
				if (!dataElement[filterKey] || dataElement[filterKey] != filters[filterKey]){
					return false;
				}
			}
			return true;
		});
	},
	update : async (table, updateData, filters = {}) => {
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
	},
	delete : async (table, filters = {}) => {
		db.data[table] = db.data[table].filter((element) => {
			console.log(element);
			for(const filterKey in filters){
				if (!element[filterKey] || element[filterKey] != filters[filterKey]){
					return true;
				}
			}
			return false;
		});
		await db.write();
	},
};

export default lowdbInterface;