import { useState } from "react";
import "./App.css";
import { webSocket, WebSocketSubjectConfig } from "rxjs/webSocket";
import { tap } from "rxjs/operators";

interface Message {
  operation?: "+" | "-";
  count?: number;
}

const wsURL = "ws://localhost:8080";
const wsConfig: WebSocketSubjectConfig<Message> = {
  url: wsURL,
  openObserver: {
    next: () => {
      console.log("WS connection opened");
    },
  },
  closeObserver: {
    next: (event) => {
      // important to do if we're unmounting the component
      if (event.wasClean) ws.complete();
    },
  },
};

const ws = webSocket<Message>(wsConfig);

function App() {
  const [count, setCount] = useState(0);

  ws.pipe(
    tap((data) => {
      setCount(data?.count ?? 0);
    })
  ).subscribe();

  function increment() {
    setCount(count + 1);
    ws.next({ operation: "+" });
  }

  function decrement() {
    setCount(count - 1);
    ws.next({ operation: "-" });
  }

  return (
    <div className="App">
      <p>Count {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

export default App;
