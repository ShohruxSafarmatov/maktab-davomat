import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoxElement from "../../components/Box";
import Breadcrumb from "../../components/Breadcrumb";
import { toastError, toastSuccess } from "../../utils/toast";
import { getLocalStorage } from "../../libs/localStorage";
import { useNavigate } from "react-router-dom";
import { PostStudents } from "../../store/actions/students";
import { ClassesGet } from "../../store/actions/classes";

export default function StudentsAdd() {
  const dispatch = useDispatch();
  const { dataClasses } = useSelector((state) => state.classes);
  const navigate = useNavigate();

  const breadcrumbPaths = [
    { label: "Asosiy sahifa", link: "/" },
    { label: "O'quvchilar", link: "/students" },
    { label: "O'quvchi qo'shish" },
  ];
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    jinsi: "",
    tug_sana: "",
    address: "",
    phone: "",
    qarindoshi: "",
    qarindoshi_phone: "",
    sinf: "",
    person_id: "",
    image: null,
  });

  const fields = [
    { label: "Ism", name: "name", type: "text" },
    { label: "Jinsi", name: "jinsi", type: "radio" },
    { label: "Tug'ilgan sana", name: "tug_sana", type: "date" },
    { label: "Manzil", name: "address", type: "text" },
    { label: "Telefon raqam", name: "phone", type: "text" },
    { label: "Qarindoshi", name: "qarindoshi", type: "text" },
    { label: "Qarindoshi tel", name: "qarindoshi_phone", type: "text" },
    { label: "Sinf", name: "sinf", type: "select" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === "image" && value instanceof File) {
          data.append(key, value, value.name);
        } else {
          data.append(key, value);
        }
      }
    });

    try {
      console.log({
        schoolId: getLocalStorage("school"),
        pupilData: data,
      });

      await dispatch(PostStudents(data));

      toastSuccess("O'quvchi muvaffaqiyatli qo'shildi!");
      navigate("/students");
    } catch (error) {
      toastError("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    }
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData({ ...formData, image: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFormData({ ...formData, image: null });
    document.getElementById("fileInput").value = null;
  };
  useEffect(() => {
    dispatch(ClassesGet(getLocalStorage("school")));
  }, []);
  return (
    <div className="students">
      <Breadcrumb title={"O'quvchi qo'shish"} paths={breadcrumbPaths} />

      <BoxElement>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="students__form"
        >
          <div className="image-upload-container">
            <label htmlFor="fileInput" className="image-preview">
              {preview ? (
                <img className="student__img" src={preview} alt="Preview" />
              ) : (
                <i className="fa-regular fa-image"></i>
              )}
            </label>

            <input
              type="file"
              id="fileInput"
              name="image"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleChange}
            />

            <div className="image-upload-actions">
              <button
                type="button"
                className="remove-btn"
                onClick={handleRemove}
              >
                O'chirish
              </button>
            </div>
          </div>

          <div className="teachers__form-block">
            {fields.map(({ label, name, type }) => {
              if (type === "radio") {
                return (
                  <div key={name} className="radio-group">
                    <label>{label}</label>
                    <div className="radio-options">
                      <label className="radio__label">
                        Erkak
                        <input
                          type="radio"
                          name={name}
                          value="ERKAK"
                          checked={formData[name] === "ERKAK"}
                          onChange={handleChange}
                          required
                        />
                      </label>
                      <label className="radio__label">
                        Ayol
                        <input
                          type="radio"
                          name={name}
                          value="AYOL"
                          checked={formData[name] === "AYOL"}
                          onChange={handleChange}
                          required
                        />
                      </label>
                    </div>
                  </div>
                );
              }

              if (type === "select") {
                return (
                  <label key={name} className="teachers__form-label">
                    {label}
                    <select
                      className="students__form-select"
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Sinfni tanlang</option>
                      {dataClasses?.map((classes, index) => (
                        <option key={index} value={classes.id}>
                          {classes.name}
                        </option>
                      ))}
                    </select>
                  </label>
                );
              }

              return (
                <label className="teachers__form-label" key={name}>
                  {label}
                  <input
                    className="teachers__form-input"
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={label}
                    required
                  />
                </label>
              );
            })}
          </div>

          <button className="teachers__add-btn" type="submit">
            Qo'shish
          </button>
        </form>
      </BoxElement>
    </div>
  );
}
