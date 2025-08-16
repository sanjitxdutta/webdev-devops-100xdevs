import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let allSockets: WebSocket[] = [];

wss.on('connection', (socket) => {
    allSockets.push(socket);

    console.log("User connected");

    socket.on("message", (message) => {
        console.log("Message recived: " + message.toString());

        allSockets.forEach((s) => {
            s.send(message.toString() + ": sent from the server");
        })
    })

    socket.on("disconnect", () => {
        allSockets = allSockets.filter(x => x != socket);
    })

});   