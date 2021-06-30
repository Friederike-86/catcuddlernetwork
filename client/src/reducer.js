import * as Actions from './action'

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

export default function chat(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_MESSAG:
      return Object.assign({}, state, {
        messages: state.messages.concat([action.msg]),
      })

    case Actions.ADD_MESSAGE:
      return Object.assign({}, state, {
        messages: state.messages.concat([action.msg]),
      })

    default:
      return state
  }
}

const initialState = {
  messages: [],
}
