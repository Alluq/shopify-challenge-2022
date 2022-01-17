import express from 'express';
import db from '../utils/db/lowdb.js';
const router = express.Router();
const ITEMS_TABLE = 'items';

router.get('/', (req, res, next) => {
	res.status(200).json(db.read('items'))
});

router.post('/', (req, res, next) => {
	db.create(ITEMS_TABLE, req.body);
	res.send('posted');
});

router.put('/', (req, res, next) => {
	db.update(ITEMS_TABLE, req.body, req.query);
	res.send('updated');
});

router.delete('/', (req, res, next) => {
	db.delete(ITEMS_TABLE, req.body);
	res.send('deleted');
});

export default router;