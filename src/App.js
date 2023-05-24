
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./Chat/Chat"
import Login from "./Login/Login";
import Register from "./Register/Register"
import React, { useEffect, useState } from 'react';

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
        
       
        
    // useEffect(() => {
    //     const clearLocalStorage = () => {
    //         localStorage.clear();
    //     };

    //     window.addEventListener('beforeunload', clearLocalStorage);

    //     return () => {
    //         window.removeEventListener('beforeunload', clearLocalStorage);
    //     };
    // }, []);
    // const [isExiting, setIsExiting] = useState(false);

    // useEffect(() => {
    //     const handleBeforeUnload = () => {
    //         if (isExiting) {
    //             localStorage.clear();
    //         }
    //     };

    //     const handleExit = () => {
    //         setIsExiting(true);
    //     };
    //     window.addEventListener('beforeunload', handleBeforeUnload);
    //     window.addEventListener('unload', handleExit);

    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //         window.removeEventListener('unload', handleExit);
    //     };
    // }, [isExiting]);


    return (
        <BrowserRouter>
            <Routes onL>
                <Route path="/" element={<Login />}></Route>
                <Route path="/Login" element={<Login />}></Route>
                <Route path="/Chat" element={<Chat />}></Route>
                <Route path="/Register" element={<Register />}></Route>
            </Routes>
        </BrowserRouter>
    );

}

export default App;