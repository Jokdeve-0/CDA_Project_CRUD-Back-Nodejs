require('dotenv').config()
const express = require('express');
const app = express();

const databaseRoutes = require('./routes/database');
const userRoutes = require('./routes/user');
const editorRoutes = require('./routes/editor');
const editorMemberRoutes = require('./routes/editorMember');
const roleRoutes = require('./routes/role');
const bookRoutes = require('./routes/book');
const authRoutes = require('./routes/auth');
const csrfRouter= require('./routes/csrf.routes');

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
});

app.use('/api/database',databaseRoutes);
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/editor',editorRoutes);
app.use('/api/editorMember',editorMemberRoutes);
app.use('/api/role',roleRoutes);
app.use('/api/book',bookRoutes);
// app.use('/api',csrfRouter);

// app.use('/api',(req,res)=>{
//     res.status(200).json({message: "Bienvenue sur l'API de l'application test du projet CDA."})
// })
module.exports = app;