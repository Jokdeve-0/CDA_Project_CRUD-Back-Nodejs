require('dotenv').config();
const cookieParser = require('cookie-parser');
const config = require('./src/_config/config');
const databaseController = require('./controllers/database.controller')
const userController = require('./controllers/user.controller')
const express = require('express');
const cors = require('cors');
const routes = require('./routes/base.routes');

const app = express();
app.use(cors({ origin: config.origins, credentials: true }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/create/database',databaseController.createDatabase);

// instantiate baseRoutes by default
var baseRoutes = routes('');

app.use('/api', (req, res, next) => {
    // get the name of the controller to instantiate
    var controllerHandler = req.path.split('/')[1];
    // reassign the controller to BaseRoutes
    baseRoutes = routes(controllerHandler);
    next();
}, baseRoutes);

module.exports = app;