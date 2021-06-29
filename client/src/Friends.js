import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { socket } from "./socket";
import { chatMessages, chatMessage} from ".actions"


export default function FriendsList() {
    const dispatch = useDispatch()
    const friends = useSelector(state => state.friends ? state.friends.filter((friend) => friend.accepted) : null);
const wannabees = useSelector(state => state.friends ? state.friends.filter((friend) => !friend.accepted) : null)

