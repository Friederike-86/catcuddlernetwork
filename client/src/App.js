import React from "react";
import axios from "./axios.js";
import ProfilePicture from "./ProfilePicture";
import Uploader from "./Uploader";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            error: "",
            uploaderVisible: false,
        };
    }

    componentDidMount() {
        axios.get("/user/data.json").then((response) => {
            const { success, user, error } = response.data;
            this.setState({ user });
        });
        //this.setState({ error });
    }

    render() {
        const { user, uploaderVisible } = this.state;
        if (!user) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            );
        }
        return (
            <div>
                <h1>Welcome, {user && user.first} ! </h1>
                <ProfilePicture
                    url={user.profile_picture_url}
                    first={user.first}
                    clickHandler={() =>
                        this.setState({ uploaderVisible: true })
                    }
                />
                {uploaderVisible && (
                    <Uploader
                        closeHandler={() => {
                            this.setState({ uploaderVisible: false });
                        }}
                        uploadDoneHandler={(url) => {
                            this.setState({
                                user: {
                                    ...this.state.user,
                                    profile_picture_url: url,
                                },
                                uploaderVisible: false,
                            });
                        }}
                    />
                )}
            </div>
        );
    }
}