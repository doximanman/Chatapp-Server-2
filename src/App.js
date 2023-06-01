// import {BrowserRouter, Routes, Route} from "react-router-dom";
// import Chat from "./Chat/Chat"
// import Login from "./Login/Login";
// import Register from "./Register/Register"
// import React, {useState} from 'react';

// function App() {

//     const [user, setUser] = useState(null)

//     return (
//         <BrowserRouter>
//             <Routes onL>
//                 <Route path="/" element={<Login setUser={setUser}/>}></Route>
//                 <Route path="/Login" element={<Login setUser={setUser}/>}></Route>
//                 <Route path="/Chat" element={<Chat user={user} setUser={setUser}/>}></Route>
//                 <Route path="/Register" element={<Register/>}></Route>
//             </Routes>
//         </BrowserRouter>
//     );

// }

// export default App;
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

const users = require('./server/routers/User');
app.use('/Users', users);

app.listen(process.env.PORT);