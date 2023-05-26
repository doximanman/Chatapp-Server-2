import "./Chat.css"
import Profile from "./Profile";
import ChatTitle from "./ChatTitle";
import {useState, useEffect, useRef} from "react";
import MessageList from "./MessageList";
import ChatList from "./ChatList";
import MessageSender from "./MessageSender";
import {useNavigate} from "react-router-dom";
import {ValidateUser} from "../ServerQuery/UserQuery";
import {GetChats} from "../ServerQuery/ChatQuery";

function Chat({user}) {

    const navigate = useNavigate();

    const [JWT, setJWT] = useState(null);

    const [contacts, setContacts] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate("/Login")
        }
        // sets up initial state
        const getJWT = async () => {
            setJWT(await ValidateUser(user.username, user.password))
        }
        getJWT()
    })

    useEffect(() => {
        const initializeContacts = async () => {
            let contacts = await GetChats(JWT)
            if(!contacts || contacts.length===0){
                return
            }
            contacts.forEach(contact => {
                contact["selected"] = "no"
            })
            if (contacts.length > 0) {
                contacts[0].selected = "yes"
            }
            setContacts(contacts)
            setSelectedUser(contacts.filter((contact) => {
                return contact.selected === "yes";
            })[0])
        }
        initializeContacts();
    }, [JWT])

    if (!user || !JWT) {
        return (<>Loading...</>);
    }
    return (
        <>
            <div id="main">
                <Profile user={user} setContacts={setContacts}/>
                <ChatList chats={contacts} user={selectedUser} setSelectedUser={setSelectedUser}/>
                <div id="chat">
                    <ChatTitle user={selectedUser}/>
                    <MessageList user={selectedUser}/>
                    <MessageSender contact={selectedUser} setSelectedUser={setSelectedUser}/>
                </div>
            </div>
        </>
    );
}


export default Chat
