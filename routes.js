import indexRouter from './routes/index.js'
import itemsRouter from './routes/items.js'
import groupsRouter from './routes/groups.js'

const setRoutes = async (app) => {
	app.use('/', indexRouter);
	app.use('/items', itemsRouter);
	app.use('/groups', groupsRouter);
};

export default setRoutes;
