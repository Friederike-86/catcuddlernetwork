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
    }
    console.log("state", state);
    return state;
}

// export default function chat(state = initialState, action) {
//   switch (action.type) {
//     case Actions.SET_MESSAG:
//       return Object.assign({}, state, {
//         messages: state.messages.concat([action.msg]),
//       })

//     case Actions.ADD_MESSAGE:
//       return Object.assign({}, state, {
//         messages: state.messages.concat([action.msg]),
//       })

//     default:
//       return state
//   }
// }

// const initialState = {
//   messages: [],
// }
