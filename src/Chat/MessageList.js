import ChatMessage from "./ChatMessage";

function MessageList({user}){

    if(!user){
        return (<div id="chat-body"></div>)
    }

    const messageList = user.messages.map((message, key) => {
        return <ChatMessage {...message} key={key}/>;
    });

    return(
        <div id="chat-body">
            {messageList}
        </div>
    );
}

export default MessageList;