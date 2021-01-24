const server = require("http").createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    }
});

/*const dummyUsers = {
    userA: "1",
    userB: "2",
    userC: "3"
}; // It's supposed to be the matched users currently available to currentUser*/

// TODO: can change the pipeline to the following: before going to ask for chat room, first send req to get chatroom id, get the history
// messages, then join chatroom. 

const PORT = 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on('connection', (socket) => {
    const {roomId} = socket.handshake.query;
    /*
    // const availableUsers = getAvailableMatches(currentUser); 
    //Should give back the full list of users as well as the corresponding room ids, 
    // (generate them if they don't exist) generated with uuidv4.
    const availableUsers = dummyUsers;
    const targetUser = socket.handshake.query.targetUser;
    const roomId = availableUsers[targetUser]*/

    socket.join(roomId);
    console.log(socket.id, " joined ", roomId);

    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
        console.log(socket.id, " sent ", data.body)
    });

    socket.on('disconnect', () => {
        socket.leave(roomId);
        console.log(socket.id, " disconnected from ", roomId);
    });
});

server.listen(PORT, () => {
    console.log("Listening on port: ", PORT);
})