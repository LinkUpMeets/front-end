import axios from "axios";

const getUserAccount = (id) =>
  axios.get(`http://192.168.50.111:3001/api/users/${id}`);

const getLocationFromAddress = (address) =>
  axios.get(
    `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.REACT_NATIVE_MAPQUEST_API_KEY}&location=${address}`
  );

const getLocationFromLatLong = (position) =>
  axios.get(
    `http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.REACT_NATIVE_MAPQUEST_API_KEY}&location=${position}`
  );

const loginUser = (data) =>
  axios.post("http://192.168.50.111:3001/api/users/login", data);

const createAccount = data => 
    axios.post("http://192.168.50.111:3001/api/users/signup", data);

const addUsersLynkLocation = (data, id) => 
    axios.put(`http://192.168.50.111:3001/api/addresses/${id}`, data);

const get25RadiusAddresses = (lat, lng) => 
    axios.get(`http://192.168.50.111:3001/api/addresses/25/${lat}/${lng}`);

const getAllAddresses = () => 
    axios.get(`http://192.168.50.111:3001/api/addresses/`);

const getAllUsersInLocation = locationId =>
    axios.get(`http://192.168.50.111:3001/api/users/location/${locationId}`);

const updateLikedUser = (data, id) =>
    axios.put(`http://192.168.50.111:3001/api/likedusers/${id}`, data);

const populateMatchedUsers = (userId, matchId) => 
    axios.put(`http://192.168.50.111:3001/api/users/matched/${userId}`, matchId);

const addUserToLocation = (data, id) => {
    axios.put(`http://192.168.50.111:3001/api/addresses/single/${id}`, data)
}

export {
  getUserAccount,
  loginUser,
  getLocationFromAddress,
  getLocationFromLatLong,
  createAccount,
  addUsersLynkLocation,
  getAllAddresses,
  get25RadiusAddresses,
  getAllUsersInLocation,
  updateLikedUser,
  populateMatchedUsers,
  addUserToLocation
};
