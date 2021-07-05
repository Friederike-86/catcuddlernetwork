import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "./axios";

const STATUS_REQUEST_ACCEPTED = "request-accepted";

const Rating = (props) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [status, setStatus] = useState(null);
    const [rated, setRated] = useState(false);

    useEffect(() => {
        async function makeRequest() {
            const response = await axios.get(
                `/friends/status/${props.otherUserId}.json`
            );
            if (response.data.success) {
                console.log(response.data);
                setStatus(response.data.status);
            }
        }
        makeRequest();
    }, []);
    useEffect(() => {
        async function makeRequest() {
            const response = await axios.get(
                `/rating.json?q=${props.otherUserId}`
            );
            if (response.data.success) {
                console.log(response.data);
                setRating(response.data.rating.avg);
                setRated(response.data.check);
            }
        }
        makeRequest();
    }, [rated]);

    async function sendRating(ratingValue) {
        await axios.post("/rating.json", {
            otherUserId: props.otherUserId,
            ratingValue,
        });
        setRated(true);
    }
    if (status != STATUS_REQUEST_ACCEPTED || rated) {
        return (
            <div>
                {[...Array(5)].map((star, i) => {
                    return (
                        <label key={i}>
                            <FaStar
                                className="star"
                                color={i + 1 <= rating ? "#ffc107" : "#e4e5e9"}
                                size={50}
                            />
                        </label>
                    );
                })}
            </div>
        );
    }
    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={i}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => sendRating(ratingValue)}
                        />

                        <FaStar
                            className="star"
                            color={
                                ratingValue <= (hover || rating)
                                    ? "#ffc107"
                                    : "#e4e5e9"
                            }
                            size={50}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
            <p> The rating of this CatCuddler is:{Math.floor(rating)}</p>
        </div>
    );
};

export default Rating;

//

//  useEffect(() => {
//      async function makeRequest() {
//          const response = await axios.get(
//              `/friends/status/${otherUserId}.json`
//          );
//          if (response.data.success) {
//              setStatus(response.data.status);
//          }
//      }
//      makeRequest();
//  }, []);

// NUR BEI ACCEPT DANN RAITING rendern
// FELD FÜR STERNE --> SUBMIT??

// FELD FÜR KOMMENTARE
// BUTTON DER ALES ÜBERTRÄGT an DATENBANK (Axios post)
//Route im Server WIE FREIENDBUTTON auf OtherUserProfile :)
// SERVER: Sterne und Kommentar in neue Tabelle (SQL) einfügen (STERNE, Saplen, Id_User, der das Raiting macht und vom User, der bewertet wird)
// ZUSÄTZLICH Abfrage Datenbank über den User (AXIOS GET-Abfrage an Server, was über den User in der Datenbank steht)
