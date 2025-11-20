import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClassesGet } from "../../store/actions/classes";
import { getLocalStorage } from "../../libs/localStorage";
import { AttendanceMonthClasses } from "../../store/actions/attendance";
import { useParams } from "react-router-dom";

const ClassDateForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    sinf_id: id,
    month: "",
    year: "",
  });

  const years = Array.from({ length: 10 }, (_, i) => 2016 + i);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.sinf_id || !formData.month || !formData.year) {
      alert("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    const preparedData = {
      sinf_id: parseInt(formData.sinf_id),
      month: parseInt(formData.month),
      year: parseInt(formData.year),
    };

    dispatch(AttendanceMonthClasses(preparedData));
  };

  useEffect(() => {
    dispatch(ClassesGet(getLocalStorage("school")));
    dispatch(
      AttendanceMonthClasses({
        sinf_id: id,
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      })
    );
  }, [dispatch]);

  return (
    <form className="classes__filter-form" onSubmit={handleSubmit}>
      <div className="classes__form-block">
        <select
          name="month"
          className="classes__filter-select"
          value={formData.month}
          onChange={handleChange}
        >
          <option value="">Oyni tanlang 1-12</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <select
          name="year"
          className="classes__filter-select"
          value={formData.year}
          onChange={handleChange}
        >
          <option value="">Yilni tanlang</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <button className="classes__filter-btn" type="submit">
        Izlash
      </button>
    </form>
  );
};

export default ClassDateForm;
