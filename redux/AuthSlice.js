import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import { clearAsyncData, getAsyncData, saveAsyncData } from '../utils/Utils';

const initialState = {
    userDetails: null,
    token : null,
    zoos : null,
    zoo_id : null,
    client_id: null
}

const getToken = async () =>{
    return await AsyncStorage.getItem("@antz_user_token");
}

export const AuthSlice = createSlice({
    name: 'UserAuth',
    initialState,
    reducers: {
        setSignIn: (state, action) => {
            state.userDetails = action.payload.user;
            state.zoos = action.payload.user.zoos;
            state.zoo_id = action.payload.user.zoos[0]?.zoo_id;
            state.client_id = action.payload.user.client_id;
            state.token = action.payload.token;
            saveAsyncData("@antz_user_token",action.payload.token);
        },

        setToken: (state) => {
            getAsyncData("@antz_user_data")
            .then((response) => {
                state.token = response;
            })
            .catch((error) => console.log(error));
        },

        setSignOut: (state) => {
            state.userDetails = null;
            state.zoos = null;
            state.token = null;
            clearAsyncData("@antz_user_token");
        },
    }
});

// this is for dispatch
export const { setToken, setSignIn, setSignOut, setDarkMode } = AuthSlice.actions;


// this is for configureStore
export default AuthSlice.reducer;