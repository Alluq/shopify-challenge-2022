import express from 'express'
import path from 'path'
import logger from 'morgan'
import startup from './bin/server.js'
import setupRoutes from './routes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('./public'));


setupRoutes(app);



startup(app);

