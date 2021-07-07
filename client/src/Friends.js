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
                            <li className="lifriends" key={res.id}>
                                <Link
                                    className="abuttons"
                                    to={`/user/${res.id}`}
                                >
                                    <ProfilePicture
                                        url={res.profile_picture_url}
                                    />
                                    <p>
                                        {res.first} {res.last}
                                    </p>
                                </Link>
                                <Link
                                    className="abuttons"
                                    to={`/chat/${res.id}`}
                                >
                                    Contact CatCuddler
                                </Link>
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
                            <li className="lifriends" key={res.id}>
                                <Link
                                    className="abuttons"
                                    to={`/user/${res.id}`}
                                >
                                    <ProfilePicture
                                        url={res.profile_picture_url}
                                    />
                                    <p>
                                        {res.first} {res.last}
                                    </p>
                                </Link>
                                <Link
                                    className="abuttons"
                                    to={`/chat/${res.id}`}
                                >
                                    Contact CatCuddler
                                </Link>

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
