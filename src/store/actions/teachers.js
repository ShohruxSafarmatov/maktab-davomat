import {
    createAsyncThunk
} from "@reduxjs/toolkit";
import {
    Teachers
} from "../service/teachers";

export const GetTeacher = createAsyncThunk("GetTeacher", async (userId, {
    rejectWithValue
}) => {
    try {
        const data = await Teachers.TeachersGet(userId);
        return data

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});
export const PostTeacher = createAsyncThunk("PostTeacher", async ({
    userId,
    userData
}, {
    rejectWithValue
}) => {
    try {
        const data = await Teachers.TeachersPost(userId, userData);
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});
export const EditTeacher = createAsyncThunk(
    "EditTeacher",
    async (
        userData, {
            rejectWithValue
        }) => {

        try {
            const data = await Teachers.TeachersEdit(
                userData,
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const EditTeacherImage = createAsyncThunk(
    "EditTeacherImage",
    async ({
        id,
        image
    }, {
        rejectWithValue
    }) => {
        try {
            const formData = new FormData();
            formData.append("image", image);

            const data = await Teachers.TeachersEditImage(id, formData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const DeleteTeacher = createAsyncThunk("DeleteTeacher", async (userId, {
    rejectWithValue
}) => {
    try {
        await Teachers.TeachersDelete(userId);
        return {
            id: userId
        };
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});