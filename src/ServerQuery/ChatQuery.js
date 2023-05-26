import {serverAddress} from "./ServerInfo";

export async function GetChats(JWT){
    const res=await fetch(serverAddress+"/Chats",{
        'method':'get',
        'headers':{
            'Accept':'application/json',
            'authorization':'bearer '+JWT
        },
    })
    if(!res.ok){
        return null;
    }
    return await res.json()
}