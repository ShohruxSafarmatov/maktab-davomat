import { useState } from "react";
import { useDispatch } from "react-redux";
import BoxElement from "../../components/Box";
import Breadcrumb from "../../components/Breadcrumb";
import { PostTeacher } from "../../store/actions/teachers";
import { toastError, toastSuccess } from "../../utils/toast";
import { getLocalStorage } from "../../libs/localStorage";

export default function TeachersAdd() {
  const breadcrumbPaths = [
    { label: "Asosiy sahifa", link: "/" },
    { label: "O'qituvchilar", link: "/teachers" },
    { label: "O'qituvchi qo'shish" },
  ];

  const dispatch = useDispatch();
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    school: "",
    name: "",
    jinsi: "",
    tug_sana: "",
    address: "",
    phone: "",
    email: "",
    category: "",
    datapriyoma: "",
    primech: "",
    image: null,
  });

  const fields = [
    { label: "Ism", name: "name", type: "text" },
    { label: "Jinsi", name: "jinsi", type: "radio" },
    { label: "Tug'ilgan sana", name: "tug_sana", type: "date" },
    { label: "Manzil", name: "address", type: "text" },
    { label: "Telefon raqam", name: "phone", type: "number" },
    { label: "Email", name: "email", type: "text" },
    { label: "Kategoriya", name: "category", type: "text" },
    { label: "Ishga qabul qilingan sana", name: "datapriyoma", type: "date" },
    { label: "Eslatma", name: "primech", type: "text" },
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
      await dispatch(
        PostTeacher({
          userId: getLocalStorage("school"),
          userData: data,
        })
      );
      toastSuccess("O'qituvchi muvaffaqiyatli qo'shildi!");
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

  return (
    <div className="teachers">
      <Breadcrumb title={"O'qituvchi qo'shish"} paths={breadcrumbPaths} />

      <BoxElement>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="modal-form"
        >
          <div className="image-upload-container">
            <label htmlFor="fileInput" className="image-preview">
              {preview ? (
                <img className="teacher__img" src={preview} alt="Preview" />
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
            {/* 
            <p className="image-upload-info">
              Upload image size 4MB, Format JPG, PNG, SVG
            </p> */}
          </div>
          <div className="modal__form-block">
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

              return (
                <label key={name}>
                  {label}
                  <input
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
          <button className="teacher__add-btn" type="submit">
            Qo'shish
          </button>
        </form>
      </BoxElement>
    </div>
  );
}
