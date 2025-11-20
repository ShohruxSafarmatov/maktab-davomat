    import {
        createSlice
    } from "@reduxjs/toolkit";
    import {
        ClassesGet
    } from "../actions/classes";

    const initialState = {
        loading: false,
        login: false,
        dataClasses: null,
        responseClasses: null,
        error: null,
    }

    const classesSlice = createSlice({
        name: "classes",
        initialState,
        extraReducers: (builder) => {
            builder.addCase(ClassesGet.pending, (state) => {
                    state.loading = true
                })
                .addCase(ClassesGet.fulfilled, (state, action) => {
                    state.loading = false
                    state.dataClasses = action.payload
                })
                .addCase(ClassesGet.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })
        }
    })

    export default classesSlice.reducer