const express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const cors = require('cors');
app.use(cors());

const customEnv = require('custom-env')
customEnv.env(process.env.NODE_ENV, './config');
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const users = require('./routers/Users');
app.use('/api/Users', users);

const tokens = require('./routers/Tokens');
app.use('/api/Tokens', tokens);

const chats = require('./routers/Chats');
app.use('/api/Chats', chats);

app.listen(process.env.PORT);