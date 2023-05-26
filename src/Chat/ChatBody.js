import MessageList from "./MessageList";
import MessageSender from "./MessageSender";
import {useEffect, useState} from "react";
import {GetMessages} from "../ServerQuery/ChatQuery";

function ChatBody({user,chat,JWT}){

    const [messages,setMessages]=useState(null)

    useEffect(()=>{
        if(messages)
            return

        const getMessages=async()=>{
            setMessages(await GetMessages(chat.id,JWT))
        }
        getMessages()
    })

    if(!messages){
        return <>Loading...</>
    }

    return(
        <>
            <MessageList user={user} messages={messages}/>

            <MessageSender chat={chat} JWT={JWT}/>
        </>
    )
}

export default ChatBody