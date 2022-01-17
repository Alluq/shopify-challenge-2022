import express from 'express';
import db from '../utils/db/lowdb.js';
const router = express.Router();
const GROUPS_TABLE = 'groups';

router.post('/', async (req, res, next) => {
	db.create(GROUPS_TABLE, [], req.body['group_name']);
	res.status(200).send('group created');
});

router.put('/:group_name', async (req, res, next) => {
	addItemToGroup(req.body['item_id'], req.params.group_name);
	res.status(200).send('Item has been added to group');
});

router.delete('/:group_name', async (req, res, next) => {
	deleteItemFromGroup(req.body['item_id'], req.params.group_name);
	res.status(200).send('Item has been deleted from the group');
});

export default router;

export const addItemToGroup = async (itemId, groupName) => {
	let group = await db.fetchSingle(GROUPS_TABLE, groupName);
	// console.log(group);
	group.push(itemId);
	await db.updateSingle(GROUPS_TABLE, group, groupName);
}

export const deleteItemFromGroup = async (itemId, groupName) => {
	let group = await db.fetchSingle(GROUPS_TABLE, groupName);
	group = group ? group : [];
	group = group.filter((element) => element != itemId);
	await db.updateSingle(GROUPS_TABLE, group, groupName);
}

export const getAllGroupNames = async () => {
	const group_table = await db.query(GROUPS_TABLE);
	return Object.keys(group_table);
}