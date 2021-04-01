import { combineReducers } from 'redux';
import userReducer from './userReducer';
import formReducer from './formReducer';

const rootReducer = combineReducers({
    userReducer,
    formReducer
});

export default rootReducer;