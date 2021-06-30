import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import { socket } from "./socket";

export default function Chat() {
    const chatRef = useRef();
    const chatMessages = useSelector((state) => state.chatMessages);

    useEffect(() => {
        console.log(chatRef.current);

        console.log("scrollTop", chatRef.current.scrollTop);
        console.log("scrollHeight", chatRef.current.scrollHeight);

        // force container to scroll down to the very end
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [chatMessages]);

    // in the beginning, chatMessage will be undefined,
    // make sure to handle that case (like you did in Friends.js)
    console.log("here are my last 10 chat messages", chatMessages);

    function handleKeyDown(e) {
        console.log("key pressed", e.key);

        if (e.key === "Enter") {
            e.preventDefault();
            console.log("message", e.target.value);
            socket.emit("chatMessage", e.target.value);
        }
    }

    return (
        <div>
            <h2>Welcome to our CatcuddlerChat</h2>
            <div className="chat-messages" ref={chatRef}>
                <p>Chat Messages go here 1</p>
                <p>Chat Messages go here 2</p>
                <p>Chat Messages go here 3</p>
                <p>Chat Messages go here 4</p>
                <p>Chat Messages go here 5</p>
                <p>Chat Messages go here 6</p>
                <p>Chat Messages go here 7</p>
                <p>Chat Messages go here 8</p>
                <p>Chat Messages go here 9</p>
                <p>Chat Messages go here 10</p>
            </div>
            <textarea
                placeholder="Type your nice message in here"
                onKeyDown={handleKeyDown}
            ></textarea>
        </div>
    );