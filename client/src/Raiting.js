import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Rating = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
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
        </div>
    );
};
<p>The rating of this CatCuddler is: {raiting}</p>;

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
