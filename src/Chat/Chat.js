import "./Chat.css"
import Profile from "./Profile";
import ChatTitle from "./ChatTitle";
import { useState, useEffect } from "react";
import MessageList from "./MessageList";
import ChatList from "./ChatList";
import contacts from "./Contacts"
import MessageSender from "./MessageSender";
import {useNavigate} from "react-router-dom";

function Chat({user}) {

    const navigate=useNavigate();

    const [chats, setContacts] = useState(contacts);

    const [selectedUser, setSelectedUser] = useState(chats.filter((contact) => {
        return contact.classes.includes("selected-preview");
    })[0]);

    useEffect(()=>{
        if(user.username===""){
            navigate("/")
        }
    },[user,navigate])

    return (
        <>
            <div id="main">
                <Profile user={user} setContacts={setContacts}/>
                <ChatList chats={chats} user={selectedUser} setSelectedUser={setSelectedUser} />
                <div id="chat">
                    <ChatTitle user={selectedUser} />
                    <MessageList user={selectedUser} />
                    <MessageSender contact={selectedUser} setSelectedUser={setSelectedUser} />
                </div>
            </div>
        </>
    );
}


export default Chat
