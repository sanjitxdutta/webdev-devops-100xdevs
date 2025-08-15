import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allSockets = [];

wss.on('connection', (socket) => {
    allSockets.push(socket);

    userCount++;
    console.log("User connected #" + userCount);

    socket.on("message", (message) => {
        console.log("Message recived: " + message.toString());

        allSockets.forEach((s) => {
            s.send(message.toString() + ": sent from the server");
        })
    })

});  