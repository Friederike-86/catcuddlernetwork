import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <nav className="menue">
            <h3>Menue</h3>
            <Link to="/finduser">Find CatCuddlers</Link>
        </nav>
    );
}
