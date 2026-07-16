export type ChatMessages = {
    sender: "user" | "ai",
    text: string,
    timestamp: Date;
}