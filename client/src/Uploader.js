import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
    }

    handleFileChange(e) {
        this.setState({
            file: e.target.files[0],
        });
    }

    uploadFile() {
        const { file } = this.state;
        const formData = new FormData();
        formData.append("file", file);
        axios.post("/user/upload-picture.json", formData).then((response) => {
            const { success, user } = response.data;
            if (success) {
                this.props.uploadDoneHandler(user.profile_picture_url);
            }
        });
    }
    render() {
        const { closeHandler } = this.props;
        return (
            <div>
                <button onClick={closeHandler}>❌</button>
                <input
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={(e) => this.handleFileChange(e)}
                />
                <button onClick={() => this.uploadFile()}>Upload</button>
            </div>
        );
    }
}
