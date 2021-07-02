import React from "react";
import axios from "./axios.js";
import Uploader from "./Uploader";
import ProfilePicture from "./ProfilePicture";
import Profile from "./Profile";
import FindUser from "./FindUser";
import OtherUserProfile from "./OtherUserProfile";
import Friends from "./Friends.js";
//import Chat from "./Chat.js";
import { BrowserRouter, Route } from "react-router-dom";
import Navigation from "./Navigation";

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
        } else {
            return (
                <div>
                    <h1>Welcome, {user && user.first} ! </h1>
                    {/* <ProfilePicture
                        url={user.profile_picture_url}
                        first={user.first}
                        clickHandler={() =>
                            this.setState({ uploaderVisible: true })
                        }
                    /> */}
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

                    <BrowserRouter>
                        <>
                            <Navigation />
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <>
                                        <Profile
                                            firstname={user.first}
                                            lastname={user.last}
                                            clickHandler={() => {
                                                this.setState({
                                                    uploaderVisible: true,
                                                });
                                            }}
                                            url={user.profile_picture_url}
                                            bio={user.bio}
                                            saveHandler={(bio) => {
                                                this.setState({
                                                    user: {
                                                        ...this.state.user,
                                                        bio,
                                                    },
                                                });
                                            }}
                                        />
                                    </>
                                )}
                            />
                            <Route
                                path="/user/:id"
                                component={OtherUserProfile}
                            />
                            <Route path="/findUser" component={FindUser} />
                            <Route path="/friends" component={Friends} />
                            {/* <Route path="/openchat" component={Chat} /> */}
                        </>
                    </BrowserRouter>
                </div>
            );
        }
    }
}
