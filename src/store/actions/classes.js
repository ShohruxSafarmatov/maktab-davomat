import {
    createAsyncThunk
} from "@reduxjs/toolkit";
import {
    Classes
} from "../service/classes";

export const ClassesGet = createAsyncThunk("ClassesGet", async (schoolId, {
    rejectWithValue
}) => {
    try {
        const data = await Classes.GetClasses(schoolId);
        return data

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});
export const ClassesPost = createAsyncThunk("ClassesAdd", async ({
    schoolId,
    userData
}, {
    rejectWithValue
}) => {
    try {
        const data = await Classes.AddClasses(schoolId, userData);
        return data

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});
export const ClassesPut = createAsyncThunk(
    "ClassesPut",
    async (
        body, {
            rejectWithValue
        }) => {
        try {
            const data = await Classes.PutClasses(body);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const ClassesDelete = createAsyncThunk("ClassesDelete", async (classesId, {
    rejectWithValue
}) => {
    try {
        const data = await Classes.DeleteClasses(classesId);
        return data

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});