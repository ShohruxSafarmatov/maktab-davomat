import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastError, toastSuccess } from "../../utils/toast";
import { getLocalStorage } from "../../libs/localStorage";
import { ClassesPut } from "../../store/actions/classes";
import Button from "../../components/Button";
import { GetTeacher } from "../../store/actions/teachers";
import { xIcon } from "../../assets";

export default function ClassesEdit({
  setIsOpenEdit,
  setRefresh,
  classesData,
  classesId,
}) {
  const dispatch = useDispatch();
  const { teachersData } = useSelector((state) => state.teachers);
  const [formData, setFormData] = useState({
    name: "",
    startoflesson: "",
    school: getLocalStorage("school"),
    rahbar: null,
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
      await dispatch(ClassesPut({ id: classesId, ...formData }));

      toastSuccess("Sinf muvaffaqiyatli tahrirlandi!");
      setRefresh((prev) => prev + 1);
      setIsOpenEdit(false);
    } catch (error) {
      toastError("Xatolik yuz berdi. Qayta urinib ko'ring.");
    }
  };

  useEffect(() => {
    if (classesData && classesId) {
      const selectedClass = classesData.find((item) => item.id === classesId);

      if (selectedClass) {
        setFormData({
          name: selectedClass.name || "",
          startoflesson: selectedClass.startoflesson || "",
          school: selectedClass.school || getLocalStorage("school"),
          rahbar: selectedClass.rahbar ?? null,
          isfirstsmena: selectedClass.isfirstsmena ?? true,
        });
      }
    }
  }, [classesData, classesId]);

  useEffect(() => {
    dispatch(GetTeacher(getLocalStorage("school")));
  }, []);

  return (
    <div className="classes">
      <div className="classes__body">
        <Button
          classButton={"classes__close-btn"}
          onClickButton={() => setIsOpenEdit(false)}
        >
          <img className="classes__close-img" src={xIcon} alt="x-logo" />
        </Button>
        <form onSubmit={handleSubmit} className="classes__form">
          <h2 className="classes__title">Tahrirlash</h2>

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
              value={formData.rahbar !== null ? formData.rahbar : ""}
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
            Saqlash
          </button>
        </form>
      </div>
    </div>
  );
}
