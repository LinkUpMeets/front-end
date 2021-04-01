import decode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';

const token = {
    get: () => SecureStore.getItemAsync("token"),
    set: (token) => SecureStore.setItemAsync("token", token),
    delete: () => SecureStore.deleteItemAsync("token"),
    payload: async () => {
        try {
            return decode(await token.get())
        } catch (err) {
            console.error(err)
            return null
        }
    }
};

export default token;