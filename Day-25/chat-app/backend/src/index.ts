import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket;
    room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("message", (message) => {
        let parsedMessage;

        try {
            parsedMessage = JSON.parse(message.toString());
        } catch (err) {
            console.error("Invalid JSON:", message.toString());
            return;
        }

        if (parsedMessage.type === "join") {
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId,
            });
            console.log(`User joined room: ${parsedMessage.payload.roomId}`);
        }

        if (parsedMessage.type === "chat") {
            const currentUser = allSockets.find((x) => x.socket === socket);

            if (!currentUser) return;

            allSockets.forEach((user) => {
                if (user.room === currentUser.room && user.socket !== socket) {
                    user.socket.send(
                        JSON.stringify({
                            type: "chat",
                            payload: {
                                message: parsedMessage.payload.message,
                            },
                        })
                    );
                }
            });
        }
    });

    socket.on("close", () => {
        console.log("Client disconnected");
        allSockets = allSockets.filter((user) => user.socket !== socket);
    });
});
