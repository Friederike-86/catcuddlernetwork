import { useEffect, useState } from "react";
import axios from "./axios";

const STATUS_NO_REQUEST = "no-request";
const STATUS_REQUEST_ACCEPTED = "request-accepted";
const STATUS_REQUEST_MADEBYME = "request-made-by-me";
const STATUS_REQUEST_MADEBYOTHER = "request-made-by-other";

const ACTION_MAKE_REQUEST = "make-request";
const ACTION_CANCEL_REQUEST = "cancel";
const ACTION_ACCEPT_REQUEST = "accept";
const ACTION_UNFRIEND = "unfriend";

export default function FriendButton(props) {
    const { otherUserId } = props;
    const [status, setStatus] = useState(STATUS_NO_REQUEST);

    useEffect(() => {
        async function makeRequest() {
            const response = await axios.get(
                `/friends/status/${otherUserId}.json`
            );
            if (response.data.success) {
                setStatus(response.data.status);
            }
        }
        makeRequest();
        return;
    }, []);

    async function sendRequest(action) {
        const response = await axios.post(
            `/crudfriendstatus/${action}/${otherUserId}.json`
        );
        if (response.data.success) {
            setStatus(response.data.status);
        }
    }

    if (status == STATUS_NO_REQUEST) {
        return (
            <button onClick={() => sendRequest(ACTION_MAKE_REQUEST)}>
                Be best Cuddler-Friends?
            </button>
        );
    } else if (status == STATUS_REQUEST_ACCEPTED) {
        return (
            <button onClick={() => sendRequest(ACTION_UNFRIEND)}>
                Chase away catcuddler?
            </button>
        );
    } else if (status == STATUS_REQUEST_MADEBYOTHER) {
        return (
            <button onClick={() => sendRequest(ACTION_ACCEPT_REQUEST)}>
                Accept Catcuddlers request
            </button>
        );
    } else if (status == STATUS_REQUEST_MADEBYME) {
        return (
            <button onClick={() => sendRequest(ACTION_CANCEL_REQUEST)}>
                Hiss Catcuddler!
            </button>
        );
    } else {
        return <button>Fail</button>;
    }
}
