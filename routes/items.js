import express from 'express';
import db from '../utils/db/lowdb.js';
import { addItemToGroup, deleteItemFromGroup, getAllGroupNames } from './groups.js';
const router = express.Router();
const ITEMS_TABLE = 'items';

router.get('/', async (req, res, next) => {
	res.render('items', { item_list: await db.query('items') });
});

router.get('/:uid', async (req, res, next) => {
	res.render('itemEdit',  { 
		item_data : await db.fetchSingle('items', req.params.uid),
		groups : await getAllGroupNames()
	});
});

router.post('/', async (req, res, next) => {
	console.log(req.body);
	const itemId = await db.create(ITEMS_TABLE, req.body);
	if(req.body.groups){
		for(const i in req.body.groups){
			const group = req.body.groups[i];
			await addItemToGroup(itemId, group);
		}
	}
	res.send('Your item has beem created :)');
	return;
	
});

router.put('/', async (req, res, next) => {
	db.updateBatch(ITEMS_TABLE, req.body, req.query);
	res.send('updated');
});

router.put('/:uid', async (req, res, next) => {
	const previousItemData = await db.fetchSingle(ITEMS_TABLE, req.params.uid);
	await db.updateSingle(ITEMS_TABLE, req.body, req.params.uid);
	await updateItemGroups(previousItemData, req.body, req.params.uid);
	res.send('updated');
});

router.delete('/', async (req, res, next) => {
	db.deleteBatch(ITEMS_TABLE, req.body);
	res.send('deleted');
});

router.delete('/:uid', async (req, res, next) => {
	const item = await db.fetchSingle(ITEMS_TABLE, req.params.uid);
	console.log(item);
	if(item['groups']){
		for( const i in item['groups'] ){
			const group = item['groups'][i];
			await deleteItemFromGroup(req.params.uid, group);
		}
	}
	await db.deleteSingle(ITEMS_TABLE, req.params.uid);
	res.send('deleted');
});

export default router;

const updateItemGroups = async (previousItemData, currentItemData, itemId) => {
	const previousGroups = previousItemData['groups'] ? previousItemData['groups'] : [];
	const newGroups = currentItemData['groups'] ? currentItemData['groups'] : []
	const groupsToBeRemoved = previousGroups.filter((element) => !newGroups.includes(element));
	const groupsToBeAdded = newGroups.filter((element) => !previousGroups.includes(element));
	for(const i in groupsToBeRemoved){
		const group = groupsToBeRemoved[i];
		await deleteItemFromGroup(itemId, group);
	}
	for(const i in groupsToBeAdded){
		const group = groupsToBeAdded[i];
		// console.log("Group added:" + group);
		await addItemToGroup(itemId, group);
	}
}