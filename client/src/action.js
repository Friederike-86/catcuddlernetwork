import axios from "./axios";

export function setMessages(messages) {
    return { type: "SET_MESSAGES", messages };
}

export function addMessage(message) {
    return { type: "ADD_MESSAGE", message };
}

export async function getFriends() {
    const response = await axios.get("/friends/requests.json");
    return { type: "FRIENDSREQUEST", friends: response.data };
}

export async function acceptFriends(otherUserId) {
    await axios.post(`/crudfriendstatus/accept/${otherUserId}.json`);
    return { type: "ACCEPTREQUEST", otherUserId };
}

export async function deleteFriends(otherUserId) {
    await axios.post(`/crudfriendstatus/unfriend/${otherUserId}.json`);
    return { type: "UNFRIEND", otherUserId };
}
