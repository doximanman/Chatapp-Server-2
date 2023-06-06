import "./Chat.css"
import Profile from "./Profile";
import ChatTitle from "./ChatTitle";
import {useState, useEffect, useRef, useMemo} from "react";
import ChatList from "./ChatList";
import {useNavigate} from "react-router-dom";
import {GetUser, ValidateUser} from "../ServerQuery/UserQuery";
import {GetChats} from "../ServerQuery/ChatQuery";
import ChatBody from "./ChatBody";
import {io} from "socket.io-client";
import {serverAddress} from "../ServerQuery/ServerInfo";

function Chat({user,setUser}) {

    // used to navigate back to /login on logout
    const navigate = useNavigate();

    // chat list to be shown on the left
    const [chats, setChats] = useState(null);

    // selected chat to show messages and to highlight on the left
    const [selectedChat, setSelectedChat] = useState(null)

    // for the socket
    const connected = useRef(false);

    // creates a socket that stays between renders (only reconnects on remount)
    const socket = useMemo(() => io(serverAddress), []);

    useEffect(() => {
        // whenever chats change, select the proper chat
        if (chats)
            setSelectedChat(chats.filter(chat => {
                return chat.classes.includes("selected-preview")
            })[0])
    }, [chats])

    useEffect(() => {

        // chat created by another user updates this user's chat list
        const addChat = (chat) => {
            // sets the chat list to be the old chats with the new chat, assuming that chat doesn't exist
            // (prevents the chat from being created twice on the user that created it)
            setChats(chats => {
                if(chats.filter(CHAT=>CHAT.id===chat.id).length>0)
                    return chats
                return [...chats,chat]
            })
        }

        socket.on("newChat", addChat)

        return (() => {
            // removes the listener after render so the same listener doesn't add up between renders
            socket.off("newChat", addChat)
        })
    }, [socket, setChats])

    useEffect(() => {
        if(!user)
            return

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
        if (!sessionStorage.getItem('JWT')) {
            sessionStorage.clear()
            navigate("/Login")
            return;
        }

        const getUser=async(username,JWT)=>{
            setUser(await GetUser(username,JWT))
        }

        // sets up initial state
        // get JWT
        if(sessionStorage.getItem('JWT')&&!user){
            getUser(sessionStorage.getItem('username'),sessionStorage.getItem('JWT'))
            return
        }
        // chat list
        const initializeChats = async () => {
            let chats = await GetChats(sessionStorage.getItem("JWT"))
            chats.forEach(chat => {
                chat.classes = ""
            })
            setChats(chats)
        }
        if (!chats) {
            initializeChats();
        }

    })

    if (!user || !sessionStorage.getItem('JWT') || !chats) {
        return (<>Loading...</>);
    }

    return (
        <>
            <div id="main">
                <Profile user={user} chats={chats} setChats={setChats} JWT={sessionStorage.getItem("JWT")} socket={socket}/>
                <ChatList chats={chats} setChats={setChats}/>
                <div id="chat">
                    <ChatTitle chat={selectedChat}/>
                    <ChatBody user={user} chat={selectedChat} JWT={sessionStorage.getItem("JWT")} setChats={setChats} socket={socket}/>
                </div>
            </div>
        </>
    );
}


export default Chat
