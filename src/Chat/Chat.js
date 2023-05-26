import "./Chat.css"
import Profile from "./Profile";
import ChatTitle from "./ChatTitle";
import {useState, useEffect} from "react";
import ChatList from "./ChatList";
import {useNavigate} from "react-router-dom";
import {ValidateUser} from "../ServerQuery/UserQuery";
import {GetChats} from "../ServerQuery/ChatQuery";
import ChatBody from "./ChatBody";

function Chat({user}) {

    const navigate = useNavigate();

    const [JWT, setJWT] = useState(null);

    const [chats, setChats] = useState(null);

    const[selectedChat,setSelectedChat]=useState(null)


    useEffect(()=>{
        if(chats)
            setSelectedChat(chats.filter(chat=>{
                return chat.classes.includes("selected-preview")
            })[0])
    },[chats])

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
            chats.forEach(chat=>{
                chat.classes=""
            })
            setChats(chats)
        }
        if (!chats)
            initializeChats();
    })

    if (!user || !JWT || !chats) {
        return (<>Loading...</>);
    }

    return (
        <>
            <div id="main">
                <Profile user={user} setChats={setChats} JWT={JWT}/>
                <ChatList chats={chats} setChats={setChats}/>
                <div id="chat">
                    <ChatTitle chat={selectedChat}/>
                    <ChatBody user={user} chat={selectedChat} JWT={JWT} setChats={setChats}/>
                </div>
            </div>
        </>
    );
}


export default Chat
