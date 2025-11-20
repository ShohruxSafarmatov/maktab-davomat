    import {
        createSlice
    } from "@reduxjs/toolkit";
    import {
        DeleteTeacher,
        EditTeacher,
        EditTeacherImage,
        GetTeacher,
        PostTeacher
    } from "../actions/teachers";
    import {
        GetStudents,
        PostStudents
    } from "../actions/students";

    const initialState = {
        loading: false,
        studentsImage: null,
        studentsData: null,
        studetnsAdd: null,
        error: null,
    }
    const studentsSlice = createSlice({
        name: "students",
        initialState,
        extraReducers: (builder) => {
            // O'quvchilar ro'yhati
            builder.addCase(GetStudents.pending, (state) => {
                    state.loading = true
                })
                .addCase(GetStudents.fulfilled, (state, action) => {
                    state.loading = false
                    state.studentsData = action.payload
                })
                .addCase(GetStudents.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })
            // O'quvchi qo'shish
            builder.addCase(PostStudents.pending, (state) => {
                    state.loading = true
                })
                .addCase(PostStudents.fulfilled, (state, action) => {
                    state.loading = false
                    state.studetnsAdd = action.payload
                })
                .addCase(PostStudents.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })
            // O'quvchini rasmini o'zgartirish
            builder.addCase(EditTeacherImage.pending, (state) => {
                    state.loading = true
                })
                .addCase(EditTeacherImage.fulfilled, (state, action) => {
                    state.loading = false
                    state.studentsImage = action.payload
                })
                .addCase(EditTeacherImage.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })
            // O'quvchini tahrirlash
            builder.addCase(EditTeacher.pending, (state) => {
                state.loading = true
            })
            builder.addCase(EditTeacher.fulfilled, (state, action) => {
                    state.loading = false;
                    const updatedStudent = action.payload;
                    state.studentsData = state.studentsData.map((student) =>
                        student.id === updatedStudent.id ? updatedStudent : student
                    );
                })
                .addCase(EditTeacher.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })
            // O'quvchini o'chirish
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

    export default studentsSlice.reducer