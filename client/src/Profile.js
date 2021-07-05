import React from "react";
import axios from "./axios.js";
import ProfilePicture from "./ProfilePicture.js";
import BioEditor from "./BioEditor.js";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { first, last, url, clickHandler, bio, saveHandler } = this.props;
        return (
            <div className="profile">
                <h1>Profile Component</h1>
                <h2>
                    {first} {last} {ProfilePicture}
                </h2>
                <ProfilePicture
                    className="profile-picture"
                    url={url}
                    clickHandler={clickHandler}
                />
                <BioEditor bio={bio} saveHandler={saveHandler} />
            </div>
        );
    }
}
