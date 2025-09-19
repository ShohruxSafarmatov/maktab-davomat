import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Login from "./page/login";
import Dashboard from "./page/dashboard";
import { ToastContainer } from "react-toastify";
import Teachers from "./page/teachers";
import Students from "./page/students";
import Classes from "./page/classes";
import TeachersAdd from "./page/teacherAdd";

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
          <Route path="/teachers/edit:id" element={<TeachersEdit />}></Route>
          <Route path="/students" element={<Students />}></Route>
          <Route path="/classes" element={<Classes />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}
