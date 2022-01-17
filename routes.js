// import { readdirSync } from 'fs'
// import { getFileNameWithNoExt } from './utils/string/filenameUtils.js'
import itemsRouter from './routes/items.js'

const setRoutes = async (app) => {
	// const routes = readdirSync('./routes')
	// for(const i in routes){
	// 	const router = await import('./routes/' + routes[i]);
	// 	app.use('/' + getRouteName(routes[i]), router);
	// }
	app.use('/items', itemsRouter);
};

export default setRoutes;

const getRouteName = (file) => {
	const route = getFileNameWithNoExt(file);
	return route == 'index' ? '' : route;
};
