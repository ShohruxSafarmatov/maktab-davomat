import {
    combineReducers,
    configureStore
} from '@reduxjs/toolkit'
import authReducer from "../store/features/auth"
import attendanceReducer from "../store/features/attendance"
import teachersReducer from "../store/features/teachers"

const reducers = combineReducers({
    auth: authReducer,
    attendance: attendanceReducer,
    teachers: teachersReducer,
})
export const store = configureStore({
    reducer: reducers,
    devTools: true !== 'production',
});