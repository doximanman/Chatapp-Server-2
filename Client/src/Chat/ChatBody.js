import MessageList from "./MessageList";
import MessageSender from "./MessageSender";
import {useEffect, useRef, useState} from "react";
import {GetMessages} from "../ServerQuery/ChatQuery";

function ChatBody({user, chat, JWT, setChats,socket}) {

    const [messages, setMessages] = useState(null)

    const oldChatId = useRef(null)


    useEffect(()=>{

        const updateMessages=(chatID,msg)=>{
            if(chat&&chat.id===chatID) {
                if(!messages||messages.length===0)
                    setMessages([msg])
                else if(messages[0].id!==msg.id)
                    setMessages(messages=>[msg,...messages])
            }
        }

        socket.on('newMessage',updateMessages)

        return (()=>{socket.off('newMessage',updateMessages)})
    },[socket,chat,messages])

    useEffect(() => {
        if (!chat)
            return

        const updateMessages = async () => {
            if (chat.id === oldChatId.current) {
                // chat selected didn't change - means messages changed.
                // updates the last message.
                if(messages.length>0) {
                    if(!chat.lastMessage||chat.lastMessage.id!==messages[0].id) {
                        chat.lastMessage = messages[0]
                    }
                }
            } else {
                // chat selection changed - gets the messages of the new chat.
                oldChatId.current = chat.id
                setMessages(await GetMessages(chat.id, JWT))
            }
            setChats(chats => [...chats])
        }
        updateMessages()
    }, [JWT, chat, setChats, messages,socket,user])


    return (
        <>
            <MessageList user={user} messages={messages} JWT={JWT}/>
            <MessageSender user={user} chat={chat} JWT={JWT} setMessages={setMessages} socket={socket}/>
        </>
    )
}

export default ChatBody