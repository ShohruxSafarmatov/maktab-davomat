import BoxElement from "../../components/Box";
import { Link } from "react-router-dom";
import StudentsTable from "../../components/TableStudents";
import MonthAttendanceFilter from "../../components/monthAttendanceFilter";
import { useState } from "react";

export default function MonthAttendance() {
  const [dataMonthAttendance, setDataMonthAttendance] = useState(null);
  const [attendanceYear, setAttendanceYear] = useState(null);
  const [attendanceMonth, setAttendanceMonth] = useState(null);

  return (
    <div className="attendance__month">
      <h2 className="teachers__title">Oylik davomat</h2>
      <BoxElement>
        <div className="attendance__filter-block">
          <MonthAttendanceFilter
            setDataMonthAttendance={setDataMonthAttendance}
            setAttendanceYear={setAttendanceYear}
            setAttendanceMonth={setAttendanceMonth}
          />
          <Link className="teacher__add-btn" to="/students/add">
            O'quvchi qo'shish
          </Link>
        </div>
      </BoxElement>
      <BoxElement>
        <StudentsTable
          dataMonthAttendance={dataMonthAttendance}
          year={attendanceYear}
          month={attendanceMonth}
        />
      </BoxElement>
    </div>
  );
}
