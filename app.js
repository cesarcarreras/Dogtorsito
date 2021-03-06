require("dotenv").config(); // <- Importar dotenv
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose'); // <- Mongoose
const cors = require("cors"); // <- cors

//Iniciar conexión a la DB
mongoose.connect(process.env.DB_PROD, {
    useUnifiedTopology: true
})
.then((x)=>{
    console.log(`Connect to Mongo! Database name: "${x.connections[0].name}"`)
})
.catch((error)=>{
    console.log("Error connecting to mongo", error)
});

const app = express();

//CORS después de inicializar express
app.use(cors({origin:["http://localhost:3000", "http://localhost:3001", "https://dogtorsito.herokuapp.com"], credentials: true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Estas son las rutas API:

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const calendarRouter = require('./routes/calendar');
const petsRouter = require('./routes/petprofile')
const inventoryRouter = require('./routes/inventory')

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/calendar', calendarRouter);
app.use('/api/petsprofile', petsRouter);
app.use('/api/inventory',inventoryRouter);

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
});

module.exports = app;