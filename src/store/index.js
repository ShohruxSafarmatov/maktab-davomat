import {
    combineReducers,
    configureStore
} from '@reduxjs/toolkit'
import authReducer from "../store/features/auth"
import attendanceReducer from "../store/features/attendance"
import teachersReducer from "../store/features/teachers"
import studentsReducer from "../store/features/students"
import classesReducer from "../store/features/classes"

const reducers = combineReducers({
    auth: authReducer,
    attendance: attendanceReducer,
    teachers: teachersReducer,
    students: studentsReducer,
    classes: classesReducer,
})
export const store = configureStore({
    reducer: reducers,
    devTools: true !== 'production',
});