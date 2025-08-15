import React, { useEffect, useRef, useState } from 'react'

const App = () => {

  const [socket, setSocket] = useState();
  const inputRef = useRef();

  const sendMessage = () => {
    if(!socket) return;
    const message = inputRef.current.value;
    socket.send(message);
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    //@ts-ignore
    setSocket(ws);

    ws.onmessage = (ev) => {
      alert(ev.data);
    }
  }, []);

  return (
    <div>
      <input ref={inputRef} type="text" placeholder='Message....' />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default App