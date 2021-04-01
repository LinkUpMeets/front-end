import { USER_CREATE, USER_ERR, USER_LOGIN, USER_LOGOUT, USER_GET, USER_LYNKSLOCATION_UPDATE } from '../actions/userActionStatus';

const userReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_LOGIN:
            return setUserState(state, action);
        case USER_LOGOUT:
            console.log("user logout");
            return;
        case USER_ERR:
            console.log("user error");
            return setUserState(state, action);
        case USER_GET:
            return setUserState(state, action);
        case USER_LYNKSLOCATION_UPDATE:
            return setUserState(state, action);
        default:
            return state;
    };
};


const setUserState = (state, action) => {
    let newState;
    const { payload } = action;
    newState = {...state, ...payload};
    return newState;
};

export default userReducer;