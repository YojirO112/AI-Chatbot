import { useState, useRef, useEffect } from "react"
import type { ChatMessages } from "./types/chat"
import Message from "./components/Message"
import TypingIndicator from "./components/TypingIndicator"

function App() {
  const [message, setMessage] = useState("")

  const [messages, setMessages] = useState<ChatMessages[]>([])
  const [loading, setLoading] = useState(false)
  const sendMessage = async (message: string) => {
    if (!message.trim()) return;
    setMessages(prev => [
      ...prev,
      {
        sender: "user",
        text: message
      }
    ])
    setMessage("");
    setLoading(true)
    try {
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
      setMessages(prev => [
        ...prev,
        {
          sender: "ai",
          text: data.reply
        }
      ])
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        {
          sender: "ai",
          text: "Something went wrong"
        }
      ])
    }
    finally {
      setLoading(false)
    }
  }

  const messagesEndRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
  }, [loading])

  return (
    <div className="h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto h-full p-5 flex flex-col bg-white shadow-lg">
        <header className="py-4">
          <h1 className="text-center text-3xl font-bold">
            AI Chat
          </h1>
        </header>
        <main className="flex-1 overflow-y-auto py-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <h2 className="text-3xl mb-2">🤖</h2>
              <h3 className="text-xl font-semibold">AI Chatbot</h3>
              <p>Ask me anything to get started.</p>
            </div>
          ) : (
            <>
              {messages.map((message, index) =>
                // <p key={index}> {message.sender}:{message.text}</p>
                <Message key={index} message={message} />
              )}
              {loading && <TypingIndicator />}
              <div ref={messagesEndRef}></div>
            </>
          )}

        </main>
        <footer className="flex gap-4 py-4">
          <input
            ref={inputRef}
            className="flex-1 border rounded px-4 py-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage(message)
              }
            }}
            disabled={loading}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              sendMessage(message);
            }} disabled={loading}>
            {loading ? "Sending ..." : "Send"}
          </button>
        </footer>
      </div>
    </div >

  )
}


export default App