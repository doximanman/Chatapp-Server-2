import logo from "../Pictures/logo.png";

import {setSelected} from "./ChatList";



function ChatTitle({user}){

    function goBack(){
        document.getElementById('chat').classList.remove('fullscreen');
        document.getElementById('chat-list').classList.remove('hidden');
        setSelected(false);
    }



    return(
        <div id="chat-title">
            <img className="profile-pic" src={user.profilePic} alt="Profile"/>
            <div id="chat-name" className="profile-name">{user.displayName}</div>
            <img id="side-logo" src={logo} alt="Chatapp"></img>
            <button id="go-back" onClick={goBack} type="button"></button>
        </div>
    );

}


export default ChatTitle;