import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class PasswordReset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            code: "",
            password: "",
            step: 1,
            error: false,
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { email, code, password } = this.state;
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
                    code,
                    password,
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
                                onChange={(e) => this.handleInput(e)}
                                name="email"
                                placeholder="Email"
                            />

                            <button className="abuttons" type="submit">
                                New Password
                            </button>
                        </>
                    )}
                    {this.state.step === 2 && (
                        <>
                            <h1>Set New Password</h1>
                            <input
                                type="password"
                                value={this.state.last}
                                onChange={(e) => this.handleInput(e)}
                                name="password"
                                placeholder="Newpassword"
                            />
                            <input
                                value={this.state.first}
                                onChange={(e) => this.handleInput(e)}
                                name="code"
                                placeholder="Email-Code"
                            />

                            <button className="abuttons" type="submit">
                                Reset
                            </button>
                        </>
                    )}
                    {this.state.step === 3 && (
                        <>
                            <h1>Password-reset was successfull</h1>
                            <Link className="abuttons" to="/login">
                                Login again
                            </Link>
                        </>
                    )}
                </form>
            </>
        );
    }
}
