import MessageList from "./MessageList";
import MessageSender from "./MessageSender";
import {useEffect, useState} from "react";
import {GetChats, GetMessages} from "../ServerQuery/ChatQuery";

function ChatBody({user,chat,JWT,setChats}){

    const [messages,setMessages]=useState(null)

    useEffect(()=>{
        if(messages||!chat)
            return

        const getMessages=async()=>{
            setMessages(await GetMessages(chat.id,JWT))
        }
        getMessages()
    })

    useEffect(()=>{
        if(!chat)
            return

        const getChats=async()=>{
            const chats=await GetChats(JWT)
            chats.forEach(currentChat=>{
                if(currentChat.id===chat.id)
                    currentChat.classes="selected-preview"
                else{
                    currentChat.classes=""
                }
            })
            setChats(chats)
        }
        getChats()
    },[JWT,chat,setChats,messages])

    return(
        <>
            <MessageList user={user} messages={messages} JWT={JWT}/>
            <MessageSender chat={chat} JWT={JWT} setMessages={setMessages}/>
        </>
    )
}

export default ChatBody