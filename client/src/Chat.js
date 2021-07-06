import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import { socket } from "./socket";

export default function Chat(props) {
    const userId = props.match.params.id;
    const chatRef = useRef();
    const chatMessages = useSelector((state) => state.chatMessages);

    useEffect(() => {
        console.log(chatRef.current);

        console.log("scrollTop", chatRef.current.scrollTop);
        console.log("scrollHeight", chatRef.current.scrollHeight);

        // force container to scroll down to the very end
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [chatMessages]);

    function handleKeyDown(e) {
        console.log("key pressed", e.key);

        if (e.key === "Enter") {
            e.preventDefault();
            console.log("message", e.target.value);
            socket.emit("chatMessage", { message: e.target.value, userId });
        }
    }

    return (
        <div>
            <h2>Welcome to our CatcuddlerChat</h2>
            <div className="chat-messages" ref={chatRef}></div>
            <textarea
                placeholder="Type your nice message in here"
                onKeyDown={handleKeyDown}
            ></textarea>
        </div>
    );
}
