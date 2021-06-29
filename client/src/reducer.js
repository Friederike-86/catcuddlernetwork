export default function (state = {}, action) {
    if (action.type == "GET_FRIENDS_REQUEST") {
        state = {
            ...state,
            friendrequest: action.friendrequest,
        };
    } else if (action.type == "GET_FRIENDS") {
        state = {
            ...state,
            users: state.users.map((user) => {
                if (user.id == action.id) {
                    return {
                        ...user,
                        friendrequest: true,
                    };
                } else {
                    return friendrequest;
                }
            }),
        };
    }
    console.log("state", state);
    return state;
}
