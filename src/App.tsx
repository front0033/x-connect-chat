import * as React from "react";
import logo from "./logo.svg";
import "./App.css";

enum SocketStatus {
  initial = "initial",
  open = "open",
  error = "error",
  close = "close",
}

function App() {
  const [status, setStatus] = React.useState<SocketStatus>(
    SocketStatus.initial
  );
  React.useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");

    socket.onopen = () => setStatus(SocketStatus.open);
    socket.onerror = () => setStatus(SocketStatus.error);
  }, []);

  return (
    <div className="App">
      SOCKET_STATUS:::::{status}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
