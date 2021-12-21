const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

const mongoose = require('mongoose');

const keys = require('./config/keys');

const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const categoryRoutes = require('./routes/category');
const clientRoutes = require('./routes/client');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');
const userRoutes = require('./routes/user');

const app = express();

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(morgan('dev'));
app.use(cors());
;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));

app.use('/api/auth/', authRoutes);
app.use('/api/analytics/', analyticsRoutes);
app.use('/api/category/', categoryRoutes);
app.use('/api/client/', clientRoutes);
app.use('/api/order/', orderRoutes);
app.use('/api/position/', positionRoutes);
app.use('/api/user/', userRoutes);


const OPTS = {
    family: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose.connect(keys.mongoURI, OPTS)
    .then( () => console.log("Connected to mongoDB"))
    .catch( error => console.log("Connect to mongoDB error: " + error) );

module.exports = app;