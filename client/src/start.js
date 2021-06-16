import ReactDOM from "react-dom";
import axios from "./axios.js";

import App from "./App.js";

import Welcome from "./Welcome";

axios.get("/user/id.json").then(function ({ data }) {
    if (!data.id) {
        ReactDOM.render(<Welcome />, document.querySelector("main"));
    } else {
        ReactDOM.render(<App />, document.querySelector("main"));
    }
});

// function Weclome() {
//     return (
//         <div id={Welcome}>
//             <h1>Welcome to CatCuddlers Cologne</h1>
//         </div>
//     )

// }
