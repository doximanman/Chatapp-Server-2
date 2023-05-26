import {serverAddress} from "./ServerInfo";
export async function ValidateUser(username,password){
    const data={username,password}
    let res;
    try {
        res = await fetch(serverAddress + "/Tokens", {
            'method': 'post',
            'headers': {
                'Content-Type': "application/json",
            },
            'body': JSON.stringify(data)
        })
    }catch (e) {
        return null;
    }
    if(!res.ok){
        return null
    }
    return await res.text();
}

export async function UserExists(username, password){
    return (await ValidateUser(username,password))!==null
}

export async function GetUser(username,JWT){
    let res;
    try {
        res = await fetch(serverAddress + "/Users/" + username, {
            'method': 'get',
            'headers': {
                'authorization': 'bearer ' + JWT,
                'Accept': 'application/json'
            }
        })
    }catch (e) {
        return null;
    }
    if(!res.ok){
        return null;
    }
    return await res.json();
}

export async function AddUser(user){
    let res;
    try {
        res = await fetch(serverAddress + "/Users", {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(user)
        })
    }catch (e) {
        return null;
    }
    return res.ok
}