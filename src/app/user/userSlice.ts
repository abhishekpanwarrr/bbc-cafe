import { AnyAction, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    user: {},
    initialized: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const user = action.payload;
            state.user = user;
        },
        setInitialized: (state) => {
            state.initialized = true;
        },
        logout: (state) => {
            state.user = {};
        },
    },
});

export const { addUser, setInitialized, logout } = userSlice.actions;

// Asynchronous action to initialize user data from AsyncStorage
export const initializeUser = () => async (dispatch:any) => {
    try {
        const jsonValue = await AsyncStorage.getItem('bbc_user');
        if (jsonValue !== null) {
            const user = JSON.parse(jsonValue);
            dispatch(addUser(user));
        }
    } catch (error) {
        console.error('Error initializing user from AsyncStorage:', error);
    } finally {
        dispatch(setInitialized());
    }
};

export default userSlice.reducer;
