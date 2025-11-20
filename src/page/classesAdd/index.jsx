import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoxElement from "../../components/Box";
import Breadcrumb from "../../components/Breadcrumb";
import { toastError, toastSuccess } from "../../utils/toast";
import { getLocalStorage } from "../../libs/localStorage";
import { useNavigate } from "react-router-dom";
import { ClassesPost } from "../../store/actions/classes";
import Button from "../../components/Button";
import { GetTeacher } from "../../store/actions/teachers";
import { xIcon } from "../../assets";

export default function ClassesAdd({ setIsOpen, setRefresh }) {
  const breadcrumbPaths = [
    { label: "Asosiy sahifa", link: "/" },
    { label: "Sinflar", link: "/classes" },
    { label: "Sinf qo'shish" },
  ];

  const dispatch = useDispatch();
  const { teachersData } = useSelector((state) => state.teachers);
  const [formData, setFormData] = useState({
    name: "",
    startoflesson: "",
    school: getLocalStorage("school"),
    rahbar: "",
    isfirstsmena: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        ClassesPost({
          schoolId: formData.school,
          userData: formData,
        })
      );
      toastSuccess("Sinf muvaffaqiyatli qo'shildi!");
      setRefresh((prev) => prev + 1);
      setIsOpen(false);
      setFormData({
        name: "",
        startoflesson: "",
        school: getLocalStorage("school"),
        rahbar: "",
        isfirstsmena: null,
      });
    } catch (error) {
      toastError("Xatolik yuz berdi. Qayta urinib ko'ring.");
    }
  };

  useEffect(() => {
    dispatch(GetTeacher(getLocalStorage("school")));
  }, []);

  return (
    <div className="classes">
      <div className="classes__body">
        <Button
          classButton={"classes__close-btn"}
          onClickButton={() => setIsOpen(false)}
        >
          <img className="classes__close-img" src={xIcon} alt="x-logo" />
        </Button>
        <form onSubmit={handleSubmit} className="classes__form">
          <h2 className="classes__title">Yangi sinf qo'shish</h2>
          <label className="classes__form-label">
            Sinf nomi
            <input
              className="classes__form-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="1-A"
              required
            />
          </label>

          <label className="classes__form-label">
            Dars boshlanish vaqti
            <input
              className="classes__form-input"
              type="time"
              name="startoflesson"
              value={formData.startoflesson}
              onChange={handleChange}
              required
            />
          </label>

          <label className="classes__form-label">
            Rahbar (ixtiyoriy)
            <select
              className="classes__form-input"
              name="rahbar"
              value={formData.rahbar || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  rahbar: e.target.value === "" ? null : Number(e.target.value),
                }))
              }
            >
              <option value="">Tanlang</option>
              {teachersData?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>

          <label className="classes__form-label">
            Smena
            <select
              className="classes__form-select"
              name="isfirstsmena"
              value={formData.isfirstsmena ? "true" : "false"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isfirstsmena: e.target.value === "true",
                }))
              }
            >
              <option className="classes__form-option" value="true">
                1-smena
              </option>
              <option className="classes__form-option" value="false">
                2-smena
              </option>
            </select>
          </label>

          <button className="classes__form-btn" type="submit">
            Qo'shish
          </button>
        </form>
      </div>
    </div>
  );
}
