import "./Login.css"
import Input from '../FormsItems/Input';
import Button from '../FormsItems/Button';
import Title from '../FormsItems/Title';
import Background from '../FormsItems/Background';
import BottomMessage from '../FormsItems/BottomMessage';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

function Login() {
    const [input, setInput] = useState({
        Username: '',
        Password: ''
    });

    const [error, setError] = useState({
        Username: '',
        Password: ''
    });

    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
        setError(prev => ({
            ...prev,
            Username: "",
            Password: ""
        }));

    }

    const isUserExist = (username, password) => {
        let users = JSON.parse(sessionStorage.getItem('users'));
        for (let i = 0; i < users.length; i++) {
            if (users[i]['username'] === username && users[i]['password'] === password) {
                return i;
            }
            else if (users[i]['username'] === username) {
                return -1;
            }
            else if (users[i]['password'] === password) {
                return -2;
            }
        }
        return -3;
    }

    const navigate = useNavigate();
    const handleLogin = e => {
        e.preventDefault();
        const username = input.Username;
        const password = input.Password;
        const isUserExistCode = isUserExist(username, password);
        if (isUserExistCode  >= 0) {
            sessionStorage.setItem('currentUser', JSON.stringify(JSON.parse(sessionStorage.getItem('users'))[isUserExistCode]) );
            navigate("/Chat");
        }
        else if (isUserExistCode === -1) {
            setError(prev => ({
                ...prev,
                Password: "Password is wrong, please try again."
            }));
        }
        else if (isUserExistCode === -2) {
            setError(prev => ({
                ...prev,
                Username: "Username is wrong, please try again."
            }));
        }
        else {
            setError(prev => ({
                ...prev,
                Username: "Username doesn't exist, please register first."
            }));
        }
    }

    return (
        <form>
            <div id="login-form">
                <Title title="Login to Message-Manager!"></Title>
                <Input description={{ labelClass: "col-sm-2 col-form-label name", ins: "Username", name: "Username", divClass: "col-sm-10", type: "text", id: "Username", value: input.Username, onChange: onInputChange, className: error.Username ? "is-invalid form-control" : "form-control" }}></Input>
                {error.Username && <span className='err invalid-feedback small'>{error.Username}</span>}
                <Input description={{ labelClass: "col-sm-2 col-form-label name", ins: "Password", name: "Password", divClass: "col-sm-10", type: "password", id: "Password", value: input.Password, onChange: onInputChange, className: error.Password ? "is-invalid form-control" : "form-control" }}></Input>
                {error.Password && <span className='err invalid-feedback small'>{error.Password}</span>}
                <Button description={{ id: "login-button", name: "Login", onClick: handleLogin }}></Button>
                <BottomMessage description={{ id: "not-registered", question: "Not regitered? ", link: "/Register", click: "Click here", goal: " to register" }}></BottomMessage>
            </div>
        </form >
    );
}

export default Login;
