import ChatPreview from "./ChatPreview";

let selected = false;

export function setSelected({bool}) {
    selected = bool;
}



function ChatList({chats, setSelectedChat}) {



    function changeSelection(chat) {
        let allow = false;
        if (window.innerWidth <= 632 && !selected) {
            document.getElementById('chat').classList.add('fullscreen');
            document.getElementById('chat-list').classList.add('hidden');
            allow = true;
        }
        if (allow || !chat.classes.includes("selected-preview")) {
            const selectedChat = chats.filter((chat) => {
                return chat.classes.includes("selected-preview");
            })[0];
            selectedChat.classes.replace("selected-preview", " ");
            chat.classes.concat(" selected-preview");
            selected = true;
            setSelectedChat({...chat});
        }
    }

    window.addEventListener('resize', function () {
        if (selected && document.getElementById('chat') != null) {
            if (window.innerWidth <= 632) {
                document.getElementById('chat').classList.add('fullscreen');
                document.getElementById('chat-list').classList.add('hidden');

            } else {
                document.getElementById('chat').classList.remove('fullscreen');
                document.getElementById('chat-list').classList.remove('hidden');
            }

        }
    })

    const chatList = chats.map((chat, key) => {
        return <ChatPreview chat={chat} changeSelection={changeSelection} key={key}/>
    });

    return (
        <div id="chat-list">
            {chatList}
        </div>
    );
}

export default ChatList;