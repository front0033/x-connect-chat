import * as React from "react";

import "./App.css";

enum SocketStatus {
  initial = "initial",
  open = "open",
  error = "error",
  close = "close",
}

const socket = new WebSocket("ws://localhost:5000");

function App() {
  const [status, setStatus] = React.useState<SocketStatus>(
    SocketStatus.initial
  );

  const [messageList, setMessageList] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState<string>("");
  React.useEffect(() => {
    socket.onopen = () => setStatus(SocketStatus.open);
    socket.onerror = () => setStatus(SocketStatus.error);
    socket.onmessage = (response) => {
      if (response.type === "message") {
        setMessageList([...messageList, JSON.parse(response["data"])]);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(message);
    socket.send(message);
    setMessage("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="App">
      SOCKET_STATUS:::::{status}
      <ul>
        {messageList.map((msg) => (
          <li key={JSON.stringify(msg)}>{JSON.stringify(msg)}</li>
        ))}
      </ul>
      <form onSubmit={submit}>
        <input name="message" onChange={handleChange} style={{ width: 300 }} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
