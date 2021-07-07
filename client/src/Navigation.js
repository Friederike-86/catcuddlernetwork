import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <nav className="menue">
            <h3>Menue</h3>
            <ul>
                <li>
                    <Link className="abuttons" to="/finduser">
                        Find CatCuddlers
                    </Link>
                </li>
                <li>
                    <Link className="abuttons" to="/friends">
                        Show ur CatCuddlers
                    </Link>
                </li>

                <li>
                    <Link className="abuttons" to="/">
                        Ur Profile
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
