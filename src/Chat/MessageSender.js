import sendIcon from "../Pictures/send-icon.png";
import {useRef} from "react";


function MessageSender({contact,setSelectedUser}){

    const userInput = useRef(null);

    if(!contact){
        return(<div id="message-send"></div>)
    }



    const newMessage = function () {
        const date = new Date();
        const input = userInput.current.value;
        if (/\S/.test(input)) {

            let hours=date.getHours();
            if(hours<10){
                hours='0'+hours;
            }
            let minutes=date.getMinutes();
            if(minutes<10){
                minutes='0'+minutes;
            }

            let msg = {message: userInput.current.value, time: hours + ":" + minutes, type: "sent",date: date.toLocaleString()};
            contact.messages.unshift(msg);
            setSelectedUser({...contact});
        }
        document.getElementById('message-input').value = '';
    }

    const enterKey = function (e) {
        if (e.key === "Enter")
            newMessage();
    }


    return(
        <div id="message-send">
            <input ref={userInput} type="text" id="message-input" placeholder="Type your message..."/>
            <button onClick={newMessage} onKeyUp={enterKey} id="send-btn" type="submit"
                    className="button-8">
                <img id="send-icon" src={sendIcon} height="28" width="40" alt="send"/>
            </button>
        </div>
    );
}

export default MessageSender;