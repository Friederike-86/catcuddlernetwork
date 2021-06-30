import { io } from "socket.io-client";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) => {
            // TODO: dispatch redux action
            // store.dispatch(chatMessages(msgs));
        });

        socket.on("chatMessage", (msg) => {
            // TODO: dispatch redux action
            // store.dispatch(chatMessage(msg));
        });
    }
};
