import React from "react";
import axios from "./axios.js";
export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            draft: props.bio,
        };
    }
    handleChange(e) {
        console.log(e);
        this.setState({ draft: e.target.value });
    }
    async saveBio() {
        try {
            const response = await axios.post("/user/bio.json", {
                bio: this.state.draft,
            });
            if (response.data.success) {
                this.props.saveHandler(response.data.bio);
                this.setState({ isEditing: false });
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { bio, clickHandler } = this.props;
        const { isEditing, draft } = this.state;
        if (isEditing) {
            return (
                <div onClick={clickHandler}>
                    <button onClick={() => this.setState({ isEditing: false })}>
                        {" "}
                        ❌
                    </button>
                    <textarea
                        name="draft"
                        value={draft}
                        onChange={(e) => this.handleChange(e)}
                    ></textarea>
                    <button onClick={() => this.saveBio()}>Save</button>
                </div>
            );
        }
        return (
            <div className="bio-editor" onClick={clickHandler}>
                <div>{bio}</div>
                <button onClick={() => this.setState({ isEditing: true })}>
                    {bio ? "Edit" : "Add Bio"}
                </button>
            </div>
        );
    }
}
