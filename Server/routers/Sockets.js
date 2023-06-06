
const SocketController=require('../controllers/Sockets');


const newSocket=(io,socket)=>{
    socket.on('connect',()=>SocketController.connect(socket));
    socket.on('name',(msg)=>SocketController.newUser(socket,msg));
    socket.on('disconnect',()=>SocketController.disconnect(socket));
    socket.on('newMessage',(usernames,chatID,msg)=>SocketController.newMessage(socket,usernames,chatID,msg));

}

module.exports={newSocket};