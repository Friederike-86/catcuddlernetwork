import ReactDOM from "react-dom";
import axios from "axios";

import Logo from "./Logo";
import Welcome from "./Welcome";

axios.get("/user/id.json").then((response) => {
    console.log(response.data);

    if (response.data.userId) {
        // userId is truthy -> user has signed up / logged in
        ReactDOM.render(<Logo />, document.querySelector("main"));
    } else {
        // userId is falsy -> user is not logged in
        ReactDOM.render(<Welcome />, document.querySelector("main"));
    }
});
