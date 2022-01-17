import indexRouter from './routes/index.js'
import itemsRouter from './routes/items.js'

const setRoutes = async (app) => {
	app.use('/', indexRouter);
	app.use('/items', itemsRouter);
};

export default setRoutes;
