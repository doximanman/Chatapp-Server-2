import {serverAddress} from "./ServerInfo";
export async function ValidateUser(username,password){
    const data={username,password}
    const res=await fetch(serverAddress+"/Tokens",{
        'method':'post',
        'headers':{
            'Content-Type':"application/json",
        },
        'body':JSON.stringify(data)
    })
    if(!res.ok){
        return null
    }
    return await res.text();
}

export async function DoesUserExist(username,password){
    return (await ValidateUser(username,password))!==null
}

export async function GetUser(username,JWT){
    const res=await fetch(serverAddress+"/Users/"+username,{
        'method':'get',
        'headers':{
            'authorization':'bearer '+JWT,
            'Accept':'application/json'
        }
    })
    if(!res.ok){
        return null;
    }
    return await res.json();
}