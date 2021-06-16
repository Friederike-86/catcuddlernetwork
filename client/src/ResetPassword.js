import React from "react";
import axios from "axios";
export default class PasswordReset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            tempPassword: "",
            newPassword: "",
            step: 1,
            error: false,
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(target, value) {
        this.setState({
            [target]: value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { email, tempPassword, newPassword } = this.state;
        if (this.state.step === 1) {
            axios
                .post("/password/reset/start.json", { email })
                .then((res) =>
                    res.data.error
                        ? this.setState({ error: true })
                        : this.setState({ step: 2 })
                )
                .catch((error) => this.setState({ error: true }));
        } else if (this.state.step === 2) {
            axios
                .post("/password/reset/verify.json", {
                    email,
                    tempPassword,
                    newPassword,
                })
                .then((res) =>
                    res.data.error
                        ? this.setState({ error: true })
                        : this.setState({ step: 3 })
                )
                .catch((error) => this.setState({ error: true }));
        }
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    {this.state.step === 1 && (
                        <>
                            <h1>Password Reset</h1>
                            <input
                        value={this.state.first}
                        onChange={this.handleChange}
                        name="email"
                        placeholder="Email"
                    ></input>
                    <input
                        value={this.state.last}
                        onChange={this.handleChange}
                        name="password"
                        placeholder="password"
                    ></input>
                                
                    {this.state.step === 2 && (
                        <>
                            <h1>Set New Password</h1>
                            <input
                        value={this.state.last}
                        onChange={this.handleChange}
                        name="newpassword"
                        placeholder="Newpassword"
                    ></input>
                           
                            <button type="submit">Reset</button>
                        </>
                    )
                </form>
            </>
        );
    }
}
