import Registration from "./Registration";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import { HashRouter, Route } from "react-router-dom";

import Logo from "./Logo";

export default function Welcome() {
    // <> </>: React Fragment
    return (
        <div id="welcome">
            <h1>Welcome to the Social Network for Catcuddlers</h1>
            <Logo />

            <HashRouter>
                <>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/ResetPassword" component={ResetPassword} />
                </>
            </HashRouter>
        </div>
    );
}
