require('dotenv').config()
const express = require('express');
const app = express();

const databaseRoutes = require('./routes/database');
const authRoutes = require('./routes/auth');
const routes = require('./routes/base.routes');

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
});

app.use('/api/database', databaseRoutes);
app.use('/api/auth', authRoutes);

var defaultController = 'role';
var baseRoutes = routes(defaultController);

app.use('/api', (req, res, next) => {
    defaultController = req.path.split('/')[1];
    baseRoutes = routes(defaultController);
    next();
}, baseRoutes);

module.exports = app;