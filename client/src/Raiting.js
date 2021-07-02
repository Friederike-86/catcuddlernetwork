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
