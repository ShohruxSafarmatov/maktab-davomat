import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AttendanceSmenaNew } from "../../store/actions/attendance";
import { getLocalStorage } from "../../libs/localStorage";
import BoxElement from "../../components/Box";
import AttendanceTableFirst from "../../components/TableAttendanceFirst";
import AttendanceTableSecond from "../../components/TableAttendanceSecond";
import AttendanceTableSummary from "../../components/TableAttendanceSummary";

const Attendance = () => {
  const dispatch = useDispatch();
  const { dataSmena } = useSelector((state) => state.attendance);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    dispatch(
      AttendanceSmenaNew({
        maktab_id: getLocalStorage("school"),
        sana: formattedDate,
      })
    );
  }, [dispatch]);

  return (
    <BoxElement>
      <ul className="attendance__table-list">
        <li className="attendance__table-item">
          <h2 className="attendance__title">
            1-smena bo'yicha sinflar ro'yxati
          </h2>
          <AttendanceTableFirst
            headValue={[
              { label: "№", key: "index" },
              { label: "Sinf", key: "sinfnomi" },
              { label: "Jami", key: "bolasoni" },
              { label: "Kelganlar", key: "kelganlar" },
              { label: "Kelmaganlar", key: "kelmaganlar" },
              { label: "Davomat %", key: "foizi" },
            ]}
            bodyValue={dataSmena?.first_shift.classes}
          />
        </li>
        <li className="attendance__table-item">
          <h2 className="attendance__title">
            2-smena bo'yicha sinflar ro'yxati
          </h2>
          <AttendanceTableSecond
            headValue={[
              { label: "№", key: "index" },
              { label: "Sinf", key: "sinfnomi" },
              { label: "Jami", key: "bolasoni" },
              { label: "Kelganlar", key: "kelganlar" },
              { label: "Kelmaganlar", key: "kelmaganlar" },
              { label: "Davomat %", key: "foizi" },
            ]}
            bodyValue={dataSmena?.second_shift.classes}
          />
        </li>

        <li className="attendance__table-item">
          <h2 className="attendance__title">Jami maktab davomat ro'yxati</h2>
          <AttendanceTableSummary
            headValue={[
              { label: "Jami", key: "bolasoni" },
              { label: "Kelganlar", key: "kelganlar" },
              { label: "Kelmaganlar", key: "kelmaganlar" },
              { label: "Davomat %", key: "foizi" },
            ]}
            bodyValue={dataSmena?.school_summary}
          />
        </li>
      </ul>
    </BoxElement>
  );
};

export default Attendance;
