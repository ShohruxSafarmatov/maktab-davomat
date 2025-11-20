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
export const AttendanceMonthClasses = createAsyncThunk("AttendanceMonthClasses", async (classesData, {
    rejectWithValue
}) => {
    try {
        const data = await Attendance.AttendanceMonth(classesData);
        return data

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});
export const AttendanceSmena = createAsyncThunk("AttendanceSmena", async (userData, {
    rejectWithValue
}) => {
    try {
        const data = await Attendance.AttendanceSchoolSmena(userData);
        return data

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});
export const AttendanceSmenaNew = createAsyncThunk("AttendanceSmenaNew", async (userData, {
    rejectWithValue
}) => {
    try {
        const data = await Attendance.AttendanceSchoolNew(userData);
        return data

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});