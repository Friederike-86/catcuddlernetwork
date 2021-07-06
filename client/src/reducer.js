//import * as Actions from "./action";

export default function (state = {}, action) {
    if (action.type == "FRIENDSREQUEST") {
        state = {
            ...state,
            friendrequest: action.friends,
        };
    } else if (action.type == "ACCEPTREQUEST") {
        state = {
            ...state,
            friendrequest: state.friendrequest.map((user) => {
                if (user.id == action.otherUserId) {
                    return {
                        ...user,
                        friendstatus: true,
                    };
                } else {
                    return user;
                }
            }),
        };
    } else if (action.type == "UNFRIEND") {
        state = {
            ...state,
            friendrequest: state.friendrequest.filter((user) => {
                return user.id != action.otherUserId;
            }),
        };
    } else if (action.type == "ADD_MESSAGE") {
        const existingMessages = state.messages || [];
        state = {
            ...state,
            messages: [...existingMessages, action.message],
        };
    }
    console.log("state", state);
    return state;
}
