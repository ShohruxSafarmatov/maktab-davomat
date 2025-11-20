import {
    createAsyncThunk
} from "@reduxjs/toolkit";
import {
    Students
} from "../service/students";

export const GetStudents = createAsyncThunk("GetStudents", async (classesId, {
    rejectWithValue
}) => {
    try {
        const data = await Students.StudentsGet(classesId);
        return data

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});
export const PostStudents = createAsyncThunk("PostStudents", async (studentdata, {
    rejectWithValue
}) => {
    try {
        const data = await Students.StudentsPost(studentdata);
        return data

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});