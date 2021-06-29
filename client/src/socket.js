import { io } from "socket.io-client";

// TODO: write those action creators & reducers
//import { chatMessages, chatMessage } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) => {
            console.log("chatMessages", msgs);

            // TODO: dispatch redux action
            // store.dispatch(chatMessages(msgs));
        });

        socket.on("chatMessage", (msg) => {
            console.log("chatMessage", msg);

            // TODO: dispatch redux action
            // store.dispatch(chatMessage(msg));
        });
    }
};
