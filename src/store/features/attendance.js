    import {
        createSlice
    } from "@reduxjs/toolkit";
    import {
        AttendanceMonthClasses,
        AttendanceRespPost,
        AttendanceSmena,
        AttendanceSmenaNew,
        HeaderChartPost
    } from "../actions/attendance";

    const initialState = {
        loading: false,
        data: null,
        dataRes: null,
        attendanceMonthClasses: null,
        dataSmena: null,
        error: null,
    }

    const attendanceSlice = createSlice({
        name: "attendance",
        initialState,

        extraReducers: (builder) => {
            // Respublika soni
            builder.addCase(HeaderChartPost.pending, (state) => {
                    state.loading = true
                })
                .addCase(HeaderChartPost.fulfilled, (state, action) => {
                    state.loading = false
                    state.login = true
                    state.data = action.payload
                })
                .addCase(HeaderChartPost.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })
            // Respublika viloyatlari soni
            builder.addCase(AttendanceRespPost.pending, (state) => {
                    state.loading = true
                })
                .addCase(AttendanceRespPost.fulfilled, (state, action) => {
                    state.loading = false
                    state.dataRes = action.payload
                })
                .addCase(AttendanceRespPost.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })
            // Respublika viloyatlari soni
            builder.addCase(AttendanceMonthClasses.pending, (state) => {
                    state.loading = true
                })
                .addCase(AttendanceMonthClasses.fulfilled, (state, action) => {
                    state.loading = false
                    state.attendanceMonthClasses = action.payload
                })
                .addCase(AttendanceMonthClasses.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })
            // Maktab smena
            builder.addCase(AttendanceSmenaNew.pending, (state) => {
                    state.loading = true
                })
                .addCase(AttendanceSmenaNew.fulfilled, (state, action) => {
                    state.loading = false
                    state.dataSmena = action.payload
                })
                .addCase(AttendanceSmenaNew.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })
        }
    })

    export default attendanceSlice.reducer