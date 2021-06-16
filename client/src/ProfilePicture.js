import React from "react";

export default class ProfilePicture extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { url } = this.props;
        if (!url) {
            return <div className="default-picture">😻</div>;
        }
        return (
            <div className="profile-picture">
                <img src={url} alt={first} />
            </div>
        );
    }
}
