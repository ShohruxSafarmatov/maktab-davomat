import { useState } from "react";
import BoxElement from "../../components/Box";
import TeacherTable from "../../components/TableTeacher";
import { Link } from "react-router-dom";

export default function Teachers() {
  return (
    <div className="teachers">
      <h2 className="teachers__title">O'qituvchilar</h2>

      <BoxElement>
        <Link className="teacher__add-btn" to="/teachers/add">
          O'qituvchi qo'shish
        </Link>
        <TeacherTable />
      </BoxElement>
    </div>
  );
}
