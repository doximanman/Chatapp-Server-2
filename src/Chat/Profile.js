import add from "../Pictures/add.png";
import { useRef } from "react";
import {useNavigate} from "react-router-dom";
import {AddChat} from "../ServerQuery/ChatQuery";

function Profile({ user, setChats,JWT }) {

    const contactInput = useRef(null);

    function updateDismiss() {
        if (contactInput.current.value !== '') {
            document.getElementById('addchatBTN').setAttribute('data-bs-dismiss', "modal");
        }
        else {
            document.getElementById('addchatBTN').removeAttribute('data-bs-dismiss');
        }
    }

    async function newChat() {
        if (/\S/.test(contactInput.current.value)) {
            let chat=await AddChat(contactInput.current.value,JWT)
            if(!chat){
                alert("Chat name not found!")
                return
            }
            chat.classes=""
            setChats(chats => [...chats, chat]);
            contactInput.current.value = '';
            updateDismiss();
        }
    }

    const navigate=useNavigate();

    const handleLogout = () => {
        navigate("/Login")
    }
        

    return (
        <div id="profile">
            <img className="profile-pic" src={user.profilePic} alt="Profile" />
            <div id="user-name" className="profile-name">{user.displayName}</div>
            <img id="add-chat" data-bs-toggle="modal" data-bs-target="#addChat" src={add}
                alt="New Chat" />
            <button type="button" onClick={handleLogout} className="btn btn-danger btn-sm" id="logout">Logout</button>
            <div className="modal" id="addChat" aria-labelledby="addChatTitle">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title" id="addChatTitle">Add a New Chat</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input ref={contactInput} onKeyUp={updateDismiss} id="nameInput" type="text" className="col-12" placeholder="Contact Name" />
                        </div>
                        <div className="modal-footer">
                            <button onClick={newChat} id="addchatBTN" type="button" className="btn btn-primary">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
