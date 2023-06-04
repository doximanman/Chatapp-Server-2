import MessageList from "./MessageList";
import MessageSender from "./MessageSender";
import {useEffect, useRef, useState} from "react";
import {GetMessages} from "../ServerQuery/ChatQuery";

function ChatBody({user, chat, JWT, setChats}) {

    const [messages, setMessages] = useState(null)

    const oldChatId = useRef(null)

    useEffect(() => {
        if (messages || !chat)
            return

        const getMessages = async () => {
            oldChatId.current = chat.id;
            setMessages(await GetMessages(chat.id, JWT))
        }
        getMessages()
    })

    useEffect(() => {
        if (!chat)
            return

        const updateMessages = async () => {
            if (chat.id === oldChatId.current) {
                if (messages)
                    chat.lastMessage = messages[0]
            } else {
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