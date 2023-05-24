import "./Chat.css"
import mainPFP from "../Pictures/user3-icon.jpg";
import Profile from "./Profile";
import ChatTitle from "./ChatTitle";
import { useState, useEffect } from "react";
import MessageList from "./MessageList";
import ChatList from "./ChatList";
import contacts from "./Contacts"
import MessageSender from "./MessageSender";
import { useNavigate } from "react-router-dom";

function Chat() {

    const [chats, setContacts] = useState(contacts);

    const user = {
        pfp: JSON.parse(sessionStorage.getItem('currentUser'))['picture'],
        name: JSON.parse(sessionStorage.getItem('currentUser'))['displayName']
    }

    const [selectedUser, setSelectedUser] = useState(chats.filter((contact) => {
        return contact.classes.includes("selected-preview");
    })[0]);

    const navigate = useNavigate();
    useEffect(() => {
        if (!JSON.parse(sessionStorage.getItem('currentUser'))['username']) {
            navigate("/Login");
        }
    }, []);

    return (
        <>
            <div id="main">
                <Profile user={user} setContacts={setContacts} />
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
