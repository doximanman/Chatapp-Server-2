import sendIcon from "../Pictures/send-icon.png";
import {useRef} from "react";
import {SendMessage} from "../ServerQuery/ChatQuery";

function MessageSender({chat,setMessages}){

    const userInput = useRef(null);

    if(!chat){
        return(<div id="message-send"></div>)
    }



    const newMessage = async ()=> {
        const input = userInput.current.value;
        if (/\S/.test(input)) {
            await SendMessage(input,chat.id,JWT)
            setJWT({...JWT});
        }
        document.getElementById('message-input').value = '';
    }

    const enterKey = async (e)=> {
        if (e.key === "Enter")
            newMessage();
    }


    return(
        <div id="message-send">
            <input ref={userInput} onKeyUp={enterKey} type="text" id="message-input" placeholder="Type your message..."/>
            <button onClick={newMessage} id="send-btn" type="submit"
                    className="button-8">
                <img id="send-icon" src={sendIcon} height="28" width="40" alt="send"/>
            </button>
        </div>
    );
}

export default MessageSender;