    import {
        createSlice
    } from "@reduxjs/toolkit";
    import {
        DeleteTeacher,
        EditTeacher,
        GetTeacher,
        PostTeacher
    } from "../actions/teachers";

    const initialState = {
        loading: false,
        teachersData: null,
        error: null,
    }
    const teachersSlice = createSlice({
        name: "teachers",
        initialState,
        extraReducers: (builder) => {
            // Ustozlar ro'yxati
            builder.addCase(GetTeacher.pending, (state) => {
                    state.loading = true
                })
                .addCase(GetTeacher.fulfilled, (state, action) => {
                    state.loading = false
                    state.teachersData = action.payload
                })
                .addCase(GetTeacher.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })
            // Ustoz qo'shish
            builder.addCase(PostTeacher.pending, (state) => {
                    state.loading = true
                })
                .addCase(PostTeacher.fulfilled, (state, action) => {
                    state.loading = false
                    state.teachersAdd = action.payload
                })
                .addCase(PostTeacher.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })
            // Ustoz o'zgartirish
            builder.addCase(EditTeacher.pending, (state) => {
                state.loading = true
            })
            builder.addCase(EditTeacher.fulfilled, (state, action) => {
                    state.loading = false;

                    const updatedTeacher = action.payload;
                    state.teachersData = state.teachersData.map((teacher) =>
                        teacher.id === updatedTeacher.id ? updatedTeacher : teacher
                    );
                })
                .addCase(EditTeacher.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })
            // Ustoz o'chirish
            builder.addCase(DeleteTeacher.pending, (state) => {
                    state.loading = true
                })
                .addCase(DeleteTeacher.fulfilled, (state, action) => {
                    state.loading = false;
                    const deletedId = action.payload?.id;
                    state.teachersData = state.teachersData.filter(item => item.id !== deletedId);
                })
                .addCase(DeleteTeacher.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })
        }
    })

    export default teachersSlice.reducer