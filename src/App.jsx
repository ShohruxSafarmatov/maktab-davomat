import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Login from "./page/login";
import Dashboard from "./page/dashboard";
import { ToastContainer } from "react-toastify";
import Teachers from "./page/teachers";
import Classes from "./page/classes";
import TeachersAdd from "./page/teacherAdd";
import TeachersEdit from "./page/teacherEdit";
import StudentsAdd from "./page/studentsAdd";
import Attendance from "./page/attendance";
import ClassesView from "./page/classesView";
import ClassesAdd from "./page/classesAdd";
import MonthAttendance from "./page/monthAttendance";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to={"/dashboard"} replace />} />
          <Route index path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/teachers" element={<Teachers />}></Route>
          <Route path="/teachers/add" element={<TeachersAdd />}></Route>
          <Route path="/teachers/edit/:id" element={<TeachersEdit />} />
          <Route path="/month-attendance" element={<MonthAttendance />}></Route>
          <Route path="/students/add" element={<StudentsAdd />}></Route>
          <Route path="/classes" element={<Classes />}></Route>
          <Route path="/classes/add" element={<ClassesAdd />}></Route>
          <Route path="/classes/:id" element={<ClassesView />}></Route>
          <Route path="/attendance" element={<Attendance />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}
