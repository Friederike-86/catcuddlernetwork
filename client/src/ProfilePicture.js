import React from "react";

export default class ProfilePicture extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { url, clickHandler } = this.props;
        if (!url) {
            return (
                <div onClick={clickHandler}>
                    <img
                        className="default-picture"
                        src="/Defaul-profile-pic.png"
                    />
                </div>
            );
        }
        return (
            <div>
                <img
                    className="profile-picture"
                    src={url}
                    onClick={clickHandler}
                />
            </div>
        );
    }
}
