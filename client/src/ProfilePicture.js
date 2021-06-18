import React from "react";

export default class ProfilePicture extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { url, clickHandler } = this.props;
        if (!url) {
            return (
                <div onClick={clickHandler} className="default-picture">
                    😻
                </div>
            );
        }
        return (
            <div className="profile-picture">
                <img src={url} onClick={clickHandler} />
            </div>
        );
    }
}
