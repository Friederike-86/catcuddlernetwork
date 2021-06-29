import ReactDOM from "react-dom";
import axios from "./axios.js";

import App from "./App.js";

import Welcome from "./Welcome";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

import { init } from "./socket";

// #2 - create our store
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

axios.get("/user/id.json").then(function ({ data }) {
    if (!data.id) {
        ReactDOM.render(<Welcome />, document.querySelector("main"));
    } else {
        init(store);
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.querySelector("main")
        );
    }
});

// function Weclome() {
//     return (
//         <div id={Welcome}>
//             <h1>Welcome to CatCuddlers Cologne</h1>
//         </div>
//     )

// }
