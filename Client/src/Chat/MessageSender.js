import sendIcon from "../Pictures/send-icon.png";
import {useRef} from "react";
import {SendMessage} from "../ServerQuery/ChatQuery";

function MessageSender({chat,JWT,setMessages}){

    const userInput = useRef(null);

    if(!chat){
        return <></>
    }

    const newMessage = async ()=> {
        const input = userInput.current.value;
        if (/\S/.test(input)) {
            const message=await SendMessage(input,chat.id,JWT)
            if(message===null){
                return
            }
            setMessages(messages=>[message,...messages]);
        }
        document.getElementById('message-input').value = '';
    }

    const enterKey = async (e)=> {
        if (e.key === "Enter")
            await newMessage();
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