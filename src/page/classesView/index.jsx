import { useDispatch, useSelector } from "react-redux";
import BoxElement from "../../components/Box";
import ClassDateForm from "../../components/ClassesFormData";
import AttendanceMonthTable from "../../components/TableAttendanceMonth";

export default function ClassesView() {
  const dispatch = useDispatch();
  const { attendanceMonthClasses } = useSelector((state) => state.attendance);
  console.log(attendanceMonthClasses);

  return (
    <>
      <BoxElement>
        <ClassDateForm />
      </BoxElement>
      <BoxElement>
        <div className="table__scroll">
          {attendanceMonthClasses && (
            <AttendanceMonthTable bodyValue={attendanceMonthClasses} />
          )}
        </div>
      </BoxElement>
    </>
  );
}
