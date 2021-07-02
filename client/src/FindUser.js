import { useState, useEffect } from "react";
import axios from "./axios";
import ProfilePicture from "./ProfilePicture";
import { Link } from "react-router-dom";

export default function FindUser() {
    const [findQuery, setFindQuery] = useState("");
    const [findResults, setFindResults] = useState([]);

    const handleInput = (e) => {
        setFindQuery(e.target.value);
    };

    useEffect(() => {
        const wait = setTimeout(async () => {
            const response = await axios.get(
                `/findusers/users.json?q=${findQuery}`
            );
            if (response.data.success) {
                setFindResults(response.data.users);
            }
        }, 500);
        return () => clearTimeout(wait);
    }, [findQuery]);

    const logout = async () => {
        await axios.post("/logout.json");
        window.location.replace("/");
    };

    return (
        <div>
            <input
                name="FindQuery"
                placeholder="find other Catcuddlers"
                onChange={handleInput}
            />

            <ul id="find-results">
                {!findResults.length && (
                    <p>No Catcuddler matching your search.</p>
                )}
                {findResults.length > 0 &&
                    findResults.map((user) => (
                        <li key={user.id}>
                            {!user ? null : (
                                <>
                                    <Link to={`/user/${user.id}`}>
                                        <ProfilePicture
                                            url={user.profile_picture_url}
                                        />
                                        <p>
                                            {user.first} {user.last} {user.city}
                                        </p>
                                    </Link>
                                </>
                            )}
                        </li>
                    ))}
            </ul>
        </div>
    );
}
