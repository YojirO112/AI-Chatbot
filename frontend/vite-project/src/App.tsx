import { useState } from "react"
function App() {
  const [message, setMessage] = useState("")
  const [reply, setReply] = useState("");

  const sendMessage = async (message: string) => {
    const res = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "Akash",
        message: message
      })
    })
    const data = await res.json()
    setReply(data.reply)

  }
  const clearInput = () => {
    setMessage("");
  }
  return (
    <div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <h1>Hello {message}</h1>
      <button onClick={() => {
        sendMessage(message);
      }}>
        Send
      </button>
      <button onClick={clearInput}>Clear</button>
      <h2>AI: {reply}</h2>
    </div>
  )
}


export default App