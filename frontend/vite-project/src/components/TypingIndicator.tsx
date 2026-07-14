function TypingIndicator() {
    return (
        <div className="flex justify-strt mb-3">
            <div className="bg-gray-200 rounded-lg px-4 py-3 shadow">
                <div className="flex gap-1">
                    <span
                        className=" w-3 h-2 bg-gray-500 rounded-full animate-bounce"
                    >
                    </span>
                    <span
                        className=" w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                    >
                    </span>
                    <span
                        className=" w-3 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                    >
                    </span>
                </div>
            </div>
        </div>
    )
}

export default TypingIndicator