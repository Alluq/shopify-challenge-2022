import express from 'express'
import { getAllGroupNames } from './groups.js';
const router = express.Router();

router.get('/', async (req, res, next) => {

	//Renders index from views folder and passes group names
	res.render('index', { groups: await getAllGroupNames() });

})

export default router;