import React from "react";
import axios from "./axios";
import ProfilePicture from "./ProfilePicture.js";
import FriendButton from "./FriendButton.js";
import Rating from "./Rating";
import { Link } from "react-router-dom";

export default class OtherUserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            error: false,
        };
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        try {
            const response = await axios.get(`/users/${id}.json`);
            this.setState({
                user: response.data.user,
            });
        } catch (error) {
            this.setState({ error: true });
            this.props.history.push("/");
        }
    }

    render() {
        const { first, last, city, profile_picture_url, bio } =
            this.state.user || "";

        const { user } = this.state;

        if (!user) {
            return (
                <div>
                    <h1>Loading ...</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>
                        {first} {last}
                    </h1>
                    <h2> {city} </h2>
                    <ProfilePicture url={profile_picture_url} />
                    <p>{bio}</p>
                    <FriendButton otherUserId={user.id} />
                    <Link className="abuttons" to={`/chat/${user.id}`}></Link>
                    <Rating otherUserId={user.id} />
                </div>
            );
        }
    }
}
