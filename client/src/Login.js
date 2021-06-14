const { response } = require("express");

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: false
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(target, value) {
        this.setState({
            [target]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        axios.post("/login.json", { email, password })
            .then(res => {
                if (response.data.error) {
                    this.setState({ error: true });
                } else if (response.data.status === 200) {
                    location.replace("/");
                }
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    {this.state.error && <p>Whoops: something went wrong</p>}
                    <InputField name="email"  type="email" handleInput={this.handleInput} />
                    <InputField name="password" type="password" handleInput={this.handleInput} />
                    <Error error={this.state.error} />
                    <button type="submit">Login</button>
                </form>
            </>
        );
    }
}