
let socketNames= {};

const connect=(socket)=>{

}

const newUser=(socket, name)=>{
    socketNames[name]=socket;
    console.log(name+" connected")
}

const disconnect=(socket)=>{
    let name=null;
    for(const currentName in socketNames){
        if(socketNames[currentName]===socket)
            name=currentName;
    }
    if(name) {
        console.log(name+ " disconnected");
        delete socketNames[name];
    }
    else{
        console.log("A socket tried to disconnect that isn't registered!");
    }
}

const newMessage=(socket,usernames,chatID,msg)=>{
    let otherUsers=[];
    for(const currentName in socketNames){
        if(usernames.includes(currentName)){
            otherUsers.push(currentName);
        }
    }
    if(otherUsers.length>0){
        otherUsers.forEach(name=>{
            socketNames[name].emit("newMessage",chatID,msg)
            console.log("sending a new message to ",name)
        })
    }
}


module.exports={newUser,disconnect,newMessage,connect};