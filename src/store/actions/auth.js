import {
    createAsyncThunk
} from "@reduxjs/toolkit";
import {
    AuthAPI
} from "../service/auth";

export const PostLogin = createAsyncThunk("PostLogin", async (userData, {
    rejectWithValue
}) => {
    try {
        const data = await AuthAPI.Login(userData);
        return data

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});