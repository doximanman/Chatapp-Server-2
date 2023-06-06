import "./Chat.css"
import Profile from "./Profile";
import ChatTitle from "./ChatTitle";
import {useState, useEffect, useRef, useMemo} from "react";
import ChatList from "./ChatList";
import {useNavigate} from "react-router-dom";
import {ValidateUser} from "../ServerQuery/UserQuery";
import {GetChats} from "../ServerQuery/ChatQuery";
import ChatBody from "./ChatBody";
import {io} from "socket.io-client";
import {serverAddress} from "../ServerQuery/ServerInfo";

function Chat({user}) {

    const navigate = useNavigate();

    const [JWT, setJWT] = useState(null);

    const [chats, setChats] = useState(null);

    const [selectedChat, setSelectedChat] = useState(null)

    const connected = useRef(false);

    const socket = useMemo(() => io(serverAddress), []);

    useEffect(() => {
        if (chats)
            setSelectedChat(chats.filter(chat => {
                return chat.classes.includes("selected-preview")
            })[0])
    }, [chats])

    useEffect(() => {

        const addChat = (chat) => {
            setChats(chats => {
                if(chats.filter(CHAT=>CHAT.id===chat.id).length>0)
                    return chats
                return [...chats,chat]
            })
        }

        socket.on("newChat", addChat)

        return (() => {
            socket.off("newChat", addChat)
        })
    }, [socket, setChats])

    useEffect(() => {

        if (!connected.current) {
            connected.current = true;
            socket.emit('user', user);
            socket.on('newMessage', (chatID, msg) => {
                setChats(chats => chats.map(chat => {
                    if (chat.id === chatID) {
                        const newChat = {...chat}
                        newChat.lastMessage = msg
                        return newChat
                    }
                    return chat
                }))
            })
        }
    }, [socket, setSelectedChat, connected, user])

    useEffect(() => {
        if (!user) {
            navigate("/Login")
            return;
        }
        // sets up initial state
        // get JWT
        const getJWT = async () => {
            setJWT(await ValidateUser(user.username, user.password))
        }
        if (!JWT) {
            getJWT()
            return;
        }
        // chat list
        const initializeChats = async () => {
            let chats = await GetChats(JWT)
            chats.forEach(chat => {
                chat.classes = ""
            })
            setChats(chats)
        }
        if (!chats) {
            initializeChats();
        }

    })

    if (!user || !JWT || !chats) {
        return (<>Loading...</>);
    }

    return (
        <>
            <div id="main">
                <Profile user={user} chats={chats} setChats={setChats} JWT={JWT} socket={socket}/>
                <ChatList chats={chats} setChats={setChats}/>
                <div id="chat">
                    <ChatTitle chat={selectedChat}/>
                    <ChatBody user={user} chat={selectedChat} JWT={JWT} setChats={setChats} socket={socket}/>
                </div>
            </div>
        </>
    );
}


export default Chat
