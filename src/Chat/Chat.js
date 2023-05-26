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
import ChatBody from "./ChatBody";

function Chat({user}) {

    const navigate = useNavigate();

    const [JWT, setJWT] = useState(null);

    const [chats, setChats] = useState(null);

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
        }
        if (!chats)
            initializeChats();
    })

    if (!user || !JWT || !chats ) {
        return (<>Loading...</>);
    }

    const selectedChat=chats.filter((chat) => {
        return chat.classes.includes("selected-preview");
    })[0]

    return (
        <>
            <div id="main">
                <Profile user={user} setChats={setChats} JWT={JWT}/>
                <ChatList chats={chats} setChats={setChats}/>
                <div id="chat">
                    <ChatTitle chat={selectedChat}/>
                    <ChatBody user={user} chat={selectedChat} JWT={JWT}/>
                </div>
            </div>
        </>
    );
}


export default Chat
