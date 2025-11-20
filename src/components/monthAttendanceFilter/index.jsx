import { useDispatch, useSelector } from "react-redux";
import { ClassesGet } from "../../store/actions/classes";
import { getLocalStorage } from "../../libs/localStorage";
import { useEffect, useState } from "react";
import Button from "../Button";
import { AttendanceMonthClasses } from "../../store/actions/attendance";

export default function MonthAttendanceFilter({
  setDataMonthAttendance,
  setAttendanceMonth,
  setAttendanceYear,
}) {
  const dispatch = useDispatch();
  const { attendanceMonthClasses } = useSelector((state) => state.attendance);
  const { dataClasses } = useSelector((state) => state.classes);

  const [sinfId, setSinfId] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    dispatch(ClassesGet(getLocalStorage("school")));
  }, [dispatch]);
  const startYear = 2025;
  const endYear = 2026;

  const academicMonths = [
    { id: 9, name: "Sentabr", year: startYear },
    { id: 10, name: "Oktabr", year: startYear },
    { id: 11, name: "Noyabr", year: startYear },
    { id: 12, name: "Dekabr", year: startYear },

    { id: 1, name: "Yanvar", year: endYear },
    { id: 2, name: "Fevral", year: endYear },
    { id: 3, name: "Mart", year: endYear },
    { id: 4, name: "Aprel", year: endYear },
    { id: 5, name: "May", year: endYear },
  ];

  const years = [startYear, endYear];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!sinfId || !month || !year) {
      alert("Barcha maydonlarni to‘ldiring!");
      return;
    }

    const payload = {
      sinf_id: Number(sinfId),
      month: Number(month),
      year: Number(year),
    };
    dispatch(AttendanceMonthClasses(payload));
    setAttendanceYear(payload.year);
    setAttendanceMonth(payload.month);
  };

  useEffect(() => {
    if (attendanceMonthClasses) {
      setDataMonthAttendance(attendanceMonthClasses);
    }
  }, [attendanceMonthClasses]);

  return (
    <form className="attendance__form" onSubmit={handleSubmit}>
      <div className="attendance__form-block">
        <label className="attendance__form-label">
          <select
            className="attendance__form-select"
            value={sinfId}
            onChange={(e) => setSinfId(e.target.value)}
          >
            <option value="">Sinf tanlang</option>
            {dataClasses?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label className="attendance__form-label">
          <select
            className="attendance__form-select"
            value={month}
            onChange={(e) => {
              const chosenMonth = academicMonths.find(
                (m) => m.id === Number(e.target.value)
              );
              setMonth(e.target.value);
              setYear(chosenMonth?.year || "");
            }}
          >
            <option value="">Oy tanlang</option>
            {academicMonths.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.year})
              </option>
            ))}
          </select>
        </label>

        <label className="attendance__form-label">
          <select
            className="attendance__form-select"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Yil tanlang</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>

      <Button classButton={"teacher__add-btn"} type="submit">
        Filter
      </Button>
    </form>
  );
}
