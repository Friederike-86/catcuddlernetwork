import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        console.log("INPUT CHANGED");
        console.log("New Value:", e.target.value);
        console.log("Input Field:", e.target.name);

        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        axios
            .post("/login.json", { email, password })
            .then((response) => {
                if (response.data.error) {
                    this.setState({ error: true });
                } else if (response.data.success) {
                    location.replace("/");
                }
            })
            .catch((error) => {
                this.setState({ error: true });
            });
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    {this.state.error && <p>Whoops: something went wrong</p>}
                    <input
                        value={this.state.email}
                        onChange={this.handleChange}
                        name="email"
                        placeholder="E-Mail"
                    ></input>
                    <input
                        value={this.state.password}
                        onChange={this.handleChange}
                        name="password"
                        placeholder="Password"
                        type="password"
                    ></input>
                    <button type="submit">Login</button>
                </form>
            </>
        );
    }
}
