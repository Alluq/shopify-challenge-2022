import express from 'express';
import db from '../utils/db/lowdb.js';
import { addItemToGroup, deleteItemFromGroup, getAllGroupNames } from './groups.js';
import itemValidator from '../utils/db/validators/itemValidator.js'
const router = express.Router();
const ITEMS_TABLE = 'items';

const validation = (req, res, next) => {
	if(!itemValidator(req.body)){
		res.status(403).json({ success: false, msg: 'Fields are invalid'});
		return;
	}
	next();
};


// Gets all items
// TODO: Take query parameters to query for specific data ;)
router.get('/', async (req, res, next) => {
	res.render('items', { item_list: await db.query('items') });
});


// Sends edit item form
router.get('/:uid', async (req, res, next) => {

	const itemData = await db.fetchSingle('items', req.params.uid);

	if(!itemData){
		res.status(404).send('Item not found');
		return;
	}

	res.render('itemEdit',  { 
		item_data : itemData,
		groups : await getAllGroupNames()
	});
	
});


//Create new item
router.post('/', validation, async (req, res, next) => {

	const itemId = await db.create(ITEMS_TABLE, req.body);

	//Adding item To groups upon creation
	if(req.body.groups){
		for(const i in req.body.groups){
			const group = req.body.groups[i];
			await addItemToGroup(itemId, group);
		}
	}
	
	res.status(200).json({ success: true, msg: 'Your item has been created :)'});
	return;
	
});


//Update batch
router.put('/', validation, async (req, res, next) => {

	db.updateBatch(ITEMS_TABLE, req.body, req.query);
	res.status(200).json({ success: true, msg: 'Your item(s) has been updated'});
});


//Update based on uid
router.put('/:uid', validation, async (req, res, next) => {

	const previousItemData = await db.fetchSingle(ITEMS_TABLE, req.params.uid);
	await db.updateSingle(ITEMS_TABLE, req.body, req.params.uid);
	await updateItemGroups(previousItemData, req.body, req.params.uid);
	res.status(200).json({ success: true, msg: 'Your item has been updated'});
});

//Delete item
router.delete('/:uid', async (req, res, next) => {
	const item = await db.fetchSingle(ITEMS_TABLE, req.params.uid);
	if(item['groups']){
		for( const i in item['groups'] ){
			const group = item['groups'][i];
			await deleteItemFromGroup(req.params.uid, group);
		}
	}
	await db.deleteSingle(ITEMS_TABLE, req.params.uid);
	res.status(200).json({ success: true, msg: 'Your item has been deleted'});
});

export default router;

//Updates groups based on the what groups the item was a part of before updating.
const updateItemGroups = async (previousItemData, currentItemData, itemId) => {
	const previousGroups = previousItemData['groups'] ? previousItemData['groups'] : [];
	const newGroups = currentItemData['groups'] ? currentItemData['groups'] : []
	const groupsToBeRemoved = previousGroups.filter((element) => !newGroups.includes(element));
	const groupsToBeAdded = newGroups.filter((element) => !previousGroups.includes(element));

	//Deleting old groups
	for(const i in groupsToBeRemoved){
		const group = groupsToBeRemoved[i];
		await deleteItemFromGroup(itemId, group);
	}

	//Adding new groups
	for(const i in groupsToBeAdded){
		const group = groupsToBeAdded[i];
		await addItemToGroup(itemId, group);
	}
}
