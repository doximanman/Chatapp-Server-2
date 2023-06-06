import MessageList from "./MessageList";
import MessageSender from "./MessageSender";
import {useEffect, useRef, useState} from "react";
import {GetMessages} from "../ServerQuery/ChatQuery";

function ChatBody({user, chat, JWT, setChats,socket}) {

    const [messages, setMessages] = useState(null)

    const oldChatId = useRef(null)


    useEffect(()=>{
        socket.on('newMessage',async ()=>{
            if(chat)
                setMessages(await GetMessages(chat.id, JWT))
        })
    },[socket])

    useEffect(() => {
        if (messages || !chat)
            return

        const getMessages = async () => {
            if(chat) {
                oldChatId.current = chat.id;
                setMessages(await GetMessages(chat.id, JWT))
            }
        }

        getMessages()


    })

    useEffect(() => {
        if (!chat)
            return

        const updateMessages = async () => {
            if (chat.id === oldChatId.current) {
                // chat selected didn't change - means messages changed.
                // updates the last message.
                if (messages) {
                    chat.lastMessage = messages[0]
                    const usernames=[chat.user.username,user.username]
                    socket.emit("newMessage",usernames,chat.id,chat.lastMessage)
                }
            } else {
                // chat selection changed - gets the messages of the new chat.
                oldChatId.current = chat.id
                setMessages(await GetMessages(chat.id, JWT))

            }
            setChats(chats => [...chats])
        }
        updateMessages()
    }, [JWT, chat, setChats, messages])


    return (
        <>
            <MessageList user={user} messages={messages} JWT={JWT}/>
            <MessageSender chat={chat} JWT={JWT} setMessages={setMessages}/>
        </>
    )
}

export default ChatBody