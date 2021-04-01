import * as allUserActions from "./userActionStatus";
import {
  loginUser,
  getUserAccount,
  getLocationFromAddress,
  getLocationFromLatLong,
  createAccount,
  addUsersLynkLocation,
  updateLikedUser,
} from "../utils/API";
import token from '../actions/authLogic';
import { add } from "react-native-reanimated";
import { debugLogging } from '../utils/utils';

export const SEND_LOGIN = (data) => ({
  type: allUserActions.USER_LOGIN,
  payload: data,
});
export const SEND_LOGOUT = (data) => ({
  type: allUserActions.USER_LOGOUT,
  payload: data,
});
export const SEND_ERROR = (data) => ({
  type: allUserActions.USER_ERR,
  payload: data,
});
export const SEND_GETUSER = (data) => ({
  type: allUserActions.USER_GET,
  payload: data,
});

export const SEND_UPDATELYNKSLOCATION = (data) => ({
  type: allUserActions.USER_LYNKSLOCATION_UPDATE,
  payload: data,
});

export const login = (userCred) => {
  return async (dispatch) => {
    try {
      const { data, status } = await loginUser(userCred);
      token.set(data.token);
      const { id } = await token.payload();
      const user = await getUserAccount(id);
      const newData = {
        ...user.data,
        token: data.token,
        status
      };
      if (status === 200) {
        return dispatch(SEND_LOGIN(newData));
      } else {
        const flash = {
          type: "error",
          status,
          title: "There was an error signing up",
          content:
            "There was an error signing up, please check your fields and try again",
        };
        dispatch(SEND_ERROR(flash));
      };
    } catch (err) {
      console.error(err);
    };
  };
};

export const getUser = id => {
    return async dispatch => {
        try {
            const res = await getUserAccount(id);
            if(res.status === 200) {
                return dispatch(SEND_GETUSER(res.data));
            } else {
                let flash = {
                    type: "error",
                    title: "Error getting task list",
                    content: "There was an error getting the task list. Please try agian."
                  };
                  dispatch({ type: "DISPLAY_FLASH", data: flash });
            };
        } catch(err) {
            console.error(err);
        };
    };
};

export const updateLynksLocation = (address, id) => {
  return async dispatch => {
    try {
      const {
        data,
      } = await getLocationFromAddress(address);
      const { lat, lng } = data.results[0].locations[0].latLng;
      const locationObj = {
        address,
        longitude: lng,
        latitude: lat,
        location: [lng, lat]
      }
      const res = await addUsersLynkLocation(locationObj, id)
      if(res.status === 200) {
        return dispatch(SEND_UPDATELYNKSLOCATION(res.data))
      } else {
        let error = {
          type: "error",
          title: "Error getting task list",
          content: "There was an error getting task list. Try again."
        };
        dispatch(SEND_ERROR(error));
      }
    } catch (err) {
      console.error(err);
    }
  }
};

export const updateSwipeRightOnUser = (likedUser, userId) => {
  return async dispatch => {
    try {
      const { _id } = likedUser
      const data = {
        accountId: _id,
        liked: true
      }
      await updateLikedUser(data, userId)
      getUser(userId)
    } catch (err) {
      console.error(err);
    }
  }
}