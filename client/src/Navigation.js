import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <nav className="menue">
            <h3>Menue</h3>
            <ul>
                <li>
                    <Link to="/finduser">Find CatCuddlers</Link>
                </li>
                <li>
                    <Link to="/friends">Show ur CatCuddlers</Link>
                </li>
                <li>
                    <Link to="/chat">Talk with CatCuddlers</Link>
                </li>
            </ul>
        </nav>
    );
}
