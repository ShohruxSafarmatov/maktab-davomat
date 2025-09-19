    import {
        createSlice
    } from "@reduxjs/toolkit";
    import {
        PostLogin
    } from "../actions/auth";
    import {
        clearLocaleStorage,
        setLocalStorage
    } from "../../libs/localStorage";

    const initialState = {
        loading: false,
        login: false,
        data: null,
        error: null,
    }

    const authSlice = createSlice({
        name: "auth",
        initialState,
        reducers: {
            logout: (state) => {
                clearLocaleStorage()
                state.data = null
                state.error = null
                state.login = false
            },
        },
        extraReducers: (builder) => {
            builder.addCase(PostLogin.pending, (state) => {
                    state.loading = true
                })
                .addCase(PostLogin.fulfilled, (state, action) => {
                    state.loading = false
                    state.login = true
                    state.data = action.payload
                    setLocalStorage("school_token", state.data.token)
                    setLocalStorage("user_id", state.data.user_id)
                    setLocalStorage("user_type", state.data.user_type)
                    setLocalStorage("viloyat_id", state.data.viloyat_id)
                    setLocalStorage("tumanshahar", state.data.tumanshahar)
                    setLocalStorage("school", state.data.school)
                    setLocalStorage("isactive", state.data.isactive)

                })
                .addCase(PostLogin.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })
        }
    })
    export const {
        logout,
    } = authSlice.actions

    export default authSlice.reducer