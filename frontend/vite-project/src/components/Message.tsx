import type { ChatMessages } from "../types/chat"

type MessageProps = {
    message: ChatMessages
}

function Message({ message }: MessageProps) {
    return (
        <div className={`flex mb-3 ${message.sender === "user" ? "justify-end" : "justify-start"
            }`}
        >
            <p
                className={`max-w-md px-4 py-2 rounded-lg shadow ${message.sender === "user"
                    ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                    }`}>{message.text}</p>
        </div>
    )
}
export default Message