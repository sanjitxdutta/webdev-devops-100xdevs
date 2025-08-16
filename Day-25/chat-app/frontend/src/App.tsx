import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onopen = () => {
      console.log("Connected to server");
    };

    ws.current.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        if (parsed.type === "chat") {
          setMessages((prev) => [...prev, parsed.payload.message]);
        }
      } catch {
        console.log("Raw:", event.data);
      }
    };

    ws.current.onclose = () => {
      console.log("Disconnected from server");
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const joinRoom = () => {
    if (!roomId.trim() || !ws.current) return;
    ws.current.send(
      JSON.stringify({ type: "join", payload: { roomId } })
    );
    setJoined(true);
  };

  const sendMessage = () => {
    if (!input.trim() || !ws.current) return;
    ws.current.send(
      JSON.stringify({ type: "chat", payload: { message: input } })
    );
    setMessages((prev) => [...prev, `You: ${input}`]);
    setInput("");
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {!joined ? (
        <div className="m-auto flex flex-col gap-3 bg-white p-6 rounded-lg shadow-md w-80">
          <h2 className="text-xl font-bold text-center">Join a Room</h2>
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={joinRoom}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
          >
            Join
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`px-3 py-2 rounded-lg max-w-xs ${msg.startsWith("You:")
                    ? "ml-auto bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                  }`}
              >
                {msg}
              </div>
            ))}
          </div>

          <div className="p-3 bg-white border-t flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg font-semibold"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
