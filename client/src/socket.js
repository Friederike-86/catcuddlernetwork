import { io } from "socket.io-client";
import { addMessage } from "./action.js";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
        socket.on("newChatMessage", (message) => {
            store.dispatch(addMessage(message));
        });
    }
};
