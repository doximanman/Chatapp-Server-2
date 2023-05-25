import {BrowserRouter, Routes, Route} from "react-router-dom";
import Chat from "./Chat/Chat"
import Login from "./Login/Login";
import Register from "./Register/Register"
import userPFP from "./Pictures/user1-icon.jpg"
import React, {useEffect, useState} from 'react';
import {defaultUser} from "./Defaults";

function App() {

    useEffect(() => {
        const storedUsers = sessionStorage.getItem('users');
        if (!storedUsers) {
            sessionStorage.setItem('users', JSON.stringify([]));
        }
        const currentUser = sessionStorage.getItem('currentUser');
        if (!currentUser) {
            sessionStorage.setItem('currentUser', JSON.stringify([]));
        }
    }, []);

    const [user, setUser] = useState(defaultUser)


    return (
        <BrowserRouter>
            <Routes onL>
                <Route path="/" element={<Login setUser={setUser}/>}></Route>
                <Route path="/Login" element={<Login setUser={setUser}/>}></Route>
                <Route path="/Chat" element={<Chat user={user} setUser={setUser}/>}></Route>
                <Route path="/Register" element={<Register setUser={setUser}/>}></Route>
            </Routes>
        </BrowserRouter>
    );

}

export default App;