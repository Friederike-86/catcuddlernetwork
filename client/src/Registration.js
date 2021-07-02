import React from "react";

import { Link } from "react-router-dom";

// IMPORTANT: always make sure to import our own axios module,
// with the csrf stuff configured
import axios from "./axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            first: "",
            last: "",
            email: "",
            password: "",
            error: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const { first, last, email, password } = this.state;
        axios
            .post("/register", { first, last, email, password })
            .then((response) => {
                if (response.data.error) {
                    this.setState({ error: true });
                } else if (response.data.success) {
                    location.replace("/");
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({ error: true });
            });
    }

    handleChange(e) {
        console.log("INPUT CHANGED");
        console.log("New Value:", e.target.value);
        console.log("Input Field:", e.target.name);

        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        return (
            <>
                <h1>Registration</h1>
                {this.state.error && <p>Whoops: something went wrong</p>}
                <form onSubmit={this.handleSubmit}>
                    <input
                        className="input"
                        value={this.state.first}
                        onChange={this.handleChange}
                        name="first"
                        placeholder="First Name"
                    ></input>
                    <input
                        className="input"
                        value={this.state.last}
                        onChange={this.handleChange}
                        name="last"
                        placeholder="Last Name"
                    ></input>
                    <input
                        className="input"
                        value={this.state.email}
                        onChange={this.handleChange}
                        name="email"
                        placeholder="E-Mail"
                    ></input>
                    <input
                        className="input"
                        value={this.state.password}
                        onChange={this.handleChange}
                        name="password"
                        placeholder="Password"
                        type="password"
                    ></input>
                    <button type="submit">Create Account 🐾</button>
                </form>
                <Link className="abuttons" to="/login">
                    Already have an Acccount? 😻
                </Link>
                <Link className="abuttons" to="/resetpassword">
                    Forget Password? 🙀
                </Link>
            </>
        );
    }
}
