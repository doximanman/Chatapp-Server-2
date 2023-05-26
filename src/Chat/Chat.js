import "./Chat.css"
import Profile from "./Profile";
import ChatTitle from "./ChatTitle";
import {useState, useEffect} from "react";
import MessageList from "./MessageList";
import ChatList from "./ChatList";
import MessageSender from "./MessageSender";
import {useNavigate} from "react-router-dom";
import {ValidateUser} from "../ServerQuery/UserQuery";
import {GetChats} from "../ServerQuery/ChatQuery";

function Chat({user}) {

    const navigate = useNavigate();

    const [JWT, setJWT] = useState(null);

    const [chats, setChats] = useState(null);

    const [selectedChat, setSelectedChat] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate("/Login")
            return;
        }
        // sets up initial state
        const getJWT = async () => {
            setJWT(await ValidateUser(user.username, user.password))
        }
        if (!JWT) {
            getJWT()
            return;
        }
        const initializeChats = async () => {
            let chats = await GetChats(JWT)
            if (!chats || chats.length === 0) {
                return
            }
            chats.forEach(chat => {
                chat.classes = ""
            })
            if (chats.length > 0) {
                chats[0].classes = "selected-preview"
            }
            setChats(chats)
            setSelectedChat(chats.filter((chat) => {
                return chat.classes.includes("selected-preview");
            })[0])
        }
        if (!chats)
            initializeChats();
    })

    useEffect(() => {

    }, [JWT])

    if (!user || !JWT || !chats || !selectedChat) {
        return (<>Loading...</>);
    }
    return (
        <>
            <div id="main">
                <Profile user={user} setChats={setChats} JWT={JWT}/>
                <ChatList chats={chats} setSelectedChat={setSelectedChat}/>
                <div id="chat">
                    <ChatTitle chat={selectedChat}/>
                    <MessageList chat={selectedChat}/>
                    <MessageSender chat={selectedChat} setSelectedChat={setSelectedChat}/>
                </div>
            </div>
        </>
    );
}


export default Chat
