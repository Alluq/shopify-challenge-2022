import express from 'express';
import db from '../utils/db/lowdb.js';
const router = express.Router();
const ITEMS_TABLE = 'items';

router.get('/', async (req, res, next) => {
	res.render('items', { item_list: await db.query('items') });
});

router.get('/:uid', async (req, res, next) => {
	res.render('itemEdit',  await db.fetchSingle('items', req.params.uid));
});

router.post('/', async (req, res, next) => {
	db.create(ITEMS_TABLE, req.body);
	res.send('posted');
});

router.put('/', async (req, res, next) => {
	db.updateBatch(ITEMS_TABLE, req.body, req.query);
	res.send('updated');
});

router.put('/:uid', async (req, res, next) => {
	console.log(req.body);	
	db.updateSingle(ITEMS_TABLE, req.body, req.params.uid);
	res.send('updated');
});

router.delete('/', async (req, res, next) => {
	db.deleteBatch(ITEMS_TABLE, req.body);
	res.send('deleted');
});

router.delete('/:uid', async (req, res, next) => {
	db.deleteSingle(ITEMS_TABLE, req.params.uid);
	res.send('deleted');
});

export default router;