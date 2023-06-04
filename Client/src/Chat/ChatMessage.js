function getTime(dateTime){

    let time=(dateTime.split("T"))[1]
    time=time.split(".")[0]
    time=time.split(":")[0]+":"+time.split(":")[1]
    return time
}

function ChatMessage({user,message}){

    let type="received"
    if(user.username===message.sender.username){
        type="sent"
    }

    const classes="message message-"+type+" bubble item";

    return(
        <div className={classes}>
            {message.content}
            <div className="message-time">{getTime(message.created)}</div>
        </div>
    );
}

export default ChatMessage;