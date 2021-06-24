const db = require("./db.js");
const express = require("express");

const router = express.Router();

const STATUS_NO_REQUEST = "no-request";
const STATUS_REQUEST_ACCEPTED = "request-accepted";
const STATUS_REQUEST_MADEBYME = "request-made-by-me";
const STATUS_REQUEST_MADEBYOTHER = "request-made-by-other";

router.get("/friends/status/otherUserId.json", async (req, res) => {
    const myUserId = req.session.user.id;
    const { otherUserId } = req.params;
    try {
        const result = await db.checkFriendStatus(myUserId, otherUserId);
        const friendRequest = result.rows.length > 0 ? result.rows[0] : false;

        if (!friendRequest) {
            res.json({
                success: true,
                status: STATUS_NO_REQUEST,
            });
        } else if (friendRequest.accepted) {
            res.json({
                success: true,
                status: STATUS_REQUEST_ACCEPTED,
            });
        } else if (friendRequest.sender_id === myUserId) {
            res.json({
                success: true,
                status: STATUS_REQUEST_MADEBYME,
            });
        } else if (friendRequest.reciever_id === myUserId) {
            res.json({
                success: true,
                status: STATUS_REQUEST_MADEBYOTHER,
            });
        } else {
            res.json({
                success: false,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: true,
            error: "Server error",
        });
    }
});

const ACTION_MAKE_REQUEST = "make-request";
const ACTION_CANCEL_REQUEST = "cancel";
const ACTION_ACCEPT_REQUEST = "accept";
const ACTION_UNFRIEND = "unfriend";

router.post("/crudfriendstatus/:action/:otherUserId.json", async (req, res) => {
    const myUserId = req.session.user.id;
    const { action, otherUserId } = req.params;

    let newStatus;
    try {
        /* eslint-disable indent */
        switch (action) {
            case ACTION_MAKE_REQUEST: {
                await db.sendFriendRequest(myUserId, otherUserId);
                newStatus = STATUS_REQUEST_MADEBYME;
                break;
            }
            case ACTION_CANCEL_REQUEST: {
                await db.deleteFriendRequest(myUserId, otherUserId);
                newStatus = STATUS_NO_REQUEST;
                break;
            }
            case ACTION_ACCEPT_REQUEST: {
                await db.acceptFriendRequest(otherUserId, myUserId);
                newStatus = STATUS_REQUEST_ACCEPTED;
                break;
            }
            case ACTION_UNFRIEND: {
                await db.deleteFriendRequest(otherUserId, myUserId);
                newStatus = STATUS_NO_REQUEST;
                break;
            }
            default:
                throw new Error("Action not recognized");
        }
        res.json({
            success: true,
            status: newStatus,
        });
    } catch (error) {
        console.log(error);
    }
});
