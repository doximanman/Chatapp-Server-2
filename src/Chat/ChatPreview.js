function ChatPreview({contact, messages, changeSelection}) {

    const className = "chat-preview " + contact.classes;

    if (contact.classes.includes('selected-preview')) {
        const lastMessage = messages.length > 0 ? messages[0] : {date: '', message: ''};
        return (
            <div onClick={() => changeSelection(contact)} className={className}>
                <img className="profile-pic" src={contact.profilePic} alt="Profile"/>
                <div className="profile-name">{contact.displayName}</div>
                <div className="preview-date">{lastMessage.date}</div>
                <div>
                    <p className="last-message">{lastMessage.message}</p>
                </div>

            </div>
        );
    } else {
        const lastMessage = contact.messages.length > 0 ? contact.messages[0] : {date: '', message: ''};
        return (
            <div onClick={() => changeSelection(contact)} className={className}>
                <img className="profile-pic" src={contact.profilePic} alt="Profile"/>
                <div className="profile-name">{contact.displayName}</div>
                <div className="preview-date">{lastMessage.date}</div>
                <div>
                    <p className="last-message">{lastMessage.message}</p>
                </div>
            </div>
        );
    }
}

export default ChatPreview;