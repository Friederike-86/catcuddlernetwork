import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getFriends, acceptFriends, deleteFriends } from "./action";
import ProfilePicture from "./ProfilePicture";
import { Link } from "react-router-dom";

export default function FriendsList() {
    const dispatch = useDispatch();
    const friends = useSelector((state) =>
        state.friendrequest
            ? state.friendrequest.filter((friend) => friend.friendstatus)
            : null
    );
    const wannabees = useSelector((state) =>
        state.friendrequest
            ? state.friendrequest.filter((friend) => !friend.friendstatus)
            : null
    );

    useEffect(() => {
        dispatch(getFriends());
    }, []);

    return (
        <div>
            <ul>
                <p> Friend Requests</p>

                {wannabees ? (
                    wannabees.length ? (
                        wannabees.map((res) => (
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
                                    <Link to={`/chat/${res.id}`}>
                                        Contact CatCuddler
                                    </Link>
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
                    ) : (
                        <h1>No Friend Requests</h1>
                    )
                ) : (
                    <div>
                        <h1>Loading ...</h1>
                    </div>
                )}
            </ul>
        </div>
    );
}
