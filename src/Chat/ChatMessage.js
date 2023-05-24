function ChatMessage({message,time,type}){

    const classes="message message-"+type+" bubble item";

    return(
        <div className={classes}>
            {message}
            <div className="message-time">{time}</div>
        </div>
    );
}

export default ChatMessage;