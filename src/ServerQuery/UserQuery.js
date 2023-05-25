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

export async function doesUserExist(username,password){
    return (await ValidateUser(username,password))!==null
}