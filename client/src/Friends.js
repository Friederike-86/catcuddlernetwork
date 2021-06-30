import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { socket } from "./socket";
import { chatMessages, chatMessage} from ".actions"


export default function FriendsList() {
    const dispatch = useDispatch()
    const friends = useSelector(state => state.friends ? state.friends.filter((friend) => friend.accepted) : null);
const wannabees = useSelector(state => state.friends ? state.friends.filter((friend) => !friend.accepted) : null)


useEffect(() => {
        dispatch(getFriends());
    }, []);

    return (
        <div><ul>
                    <p> Friend Requests</p>
         
                
                {friendRequests ? (
                    friendRequests.length ? (
                        friendRequests.map((res) => (
                            <li key={res.id}>
                                <div>
                                    <ProfilePicture
                                        pictureUrl={res.profile_picture_url}
                                    />
                                    <p>
                                        {res.first} {res.last}
                                    </p>
                                </div>
                                <button
                                    onClick={() =>
                                        dispatch(acceptFriends(res.id))
                                    }
                                >
                                    Accept
                                </button>
                            </li>
                        ))
                    ) : (
                        <h1>No Friend Requests</h1>
                    )
                ) : (
                    <div>
                        <h1>Loading ...</h1>
                    </div>
                )}
                <div>
                    <p> My Friends</p>
                </div>
                {friends ? (
                    friends.length ? (
                        friends.map((res) => (
                            <li key={res.id}>
                                <div>
                                    <ProfilePicture
                                        pictureUrl={res.profile_picture_url}
                                    />
                                    <p>
                                        {res.first} {res.last}
                                    </p>
                                </div>
                                <button
                                    onClick={() =>
                                        dispatch(deleteFriends(res.id))
                                    }
                                >
                                    Unfriend
                                </button>
                            </li>
                        ))
                