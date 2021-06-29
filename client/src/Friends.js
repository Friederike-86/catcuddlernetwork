import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { socket } from "./socket";


export default function FriendsList() {
    const dispatch = useDispatch()
    const friends = useSelector(state => state.friends ? state.friends.filter((friend) => friend.accepted) : null);
const wannabees = useSelector(state => state.friends ? state.friends.filter((friend) => !friend.accepted) : null)
//action, die die Freude ausder Datenbank abragt
//

    // const OpenChat =(e) => {
    //     const actuallID = parseInt(e.currentTarget.getAttribute(id)
    //     dispatch(addopenWindow);
    //     socket.emit("openChat", id);
    }
    return (
        <ul>friends</ul>
    )
}