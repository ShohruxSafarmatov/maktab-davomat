import {
    createAsyncThunk
} from "@reduxjs/toolkit";
import {
    Attendance
} from "../service/attendance";

export const HeaderChartPost = createAsyncThunk("HeaderChartPost", async (date, {
    rejectWithValue
}) => {
    try {
        const data = await Attendance.HeaderChart(date);
        return data

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});
export const AttendanceRespPost = createAsyncThunk("AttendanceRespPost", async (date, {
    rejectWithValue
}) => {
    try {
        const data = await Attendance.AttendanceResp(date);
        return data

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});