import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { socket } from "./socket";

export default function Chat(props) {
    const userId = props.match.params.id;
    const chatRef = useRef();
    const [text, setText] = useState("");
    const chatMessages = useSelector(
        (state) =>
            state.messages &&
            state.messages.filter((item) => item.sender == userId)
    );

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
            socket.emit("chatMessage", {
                message: e.target.value,
                receiver: userId,
                name: props.name,
            });
            setText("");
        }
    }

    return (
        <div>
            <h2>Welcome to our CatcuddlerChat</h2>
            <div className="chatwindow" ref={chatRef}>
                {chatMessages &&
                    chatMessages.map((item, index) => {
                        return (
                            <p key={index}>
                                {item.name}: {item.message}
                            </p>
                        );
                    })}
            </div>
            <textarea
                placeholder="Type your nice message in here"
                onKeyDown={handleKeyDown}
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
        </div>
    );
}
