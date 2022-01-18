import express from 'express';
import db from '../utils/db/lowdb.js';
import validateGroup from '../utils/db/validators/groupValidator.js';
const router = express.Router();
const GROUPS_TABLE = 'groups';

const validateGroupName = (req, res, next) => {
	if(!validateGroup(req.params.group_name)){
		res.status(401).json({ success: false, msg: 'Invalid Group Name'});
		return;
	}
	next();
}

/** Creates a named group
 */
router.post('/', async (req, res, next) => {

	if(req.body['group_name'] && typeof req.body['group_name'] === 'string'){
		db.create(GROUPS_TABLE, [], req.body['group_name']);
		res.status(200).json({ success: true, msg: 'Your group has been created :)'});
		return;
	}
	
	res.status(401).json({ success: false, msg: 'Invalid value for "group_name"'});
	return;

});

/** Adds item to a group
 */
router.put('/:group_name', validateGroupName, async (req, res, next) => {
	if(req.body['item_id'] && typeof req.body['item_id'] === 'string'){
		await addItemToGroup(req.body['item_id'], req.params.group_name);
		res.status(200).json({ success: true, msg: 'Item has been added to group'});
		return;
	}

	res.status(401).json({ success: false, msg: 'Invalid value for "item_id"'});
});

/** Deletes item from a group
 */
router.delete('/:group_name', validateGroupName, async (req, res, next) => {

	if(req.body['item_id'] && typeof req.body['item_id'] === 'string'){
		await deleteItemFromGroup(req.body['item_id'], req.params.group_name);
		res.status(200).json({ success: true, msg: 'Item has been deleted from group'});
		return;
	}

	res.status(401).json({ success: false, msg: 'Invalid value for "item_id"'});
});

export default router;

export const addItemToGroup = async (itemId, groupName) => {

	let group = await db.fetchSingle(GROUPS_TABLE, groupName);
	group.push(itemId);

	await db.updateSingle(GROUPS_TABLE, group, groupName);
}

export const deleteItemFromGroup = async (itemId, groupName) => {

	let group = await db.fetchSingle(GROUPS_TABLE, groupName);
	group = group ? group : [];
	group = group.filter((element) => element != itemId);
	console.log(group);

	await db.updateSingle(GROUPS_TABLE, group, groupName);
}

export const getAllGroupNames = async () => {
	const group_table = await db.query(GROUPS_TABLE);
	return Object.keys(group_table);
}
