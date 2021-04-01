import initialState from "./initalState";
import { NEXT_FORM } from '../actions/formActionStatus';

const formReducer = (state = initialState, action) => {
    switch(action.type) {
        case NEXT_FORM:
            return setFormState(state, action);
        default:
            return state;
    };
};


const setFormState = (state, action) => {
    let newState;
    const { payload } = action;
    newState = {...state, ...payload};
    return newState;
};

export default formReducer;