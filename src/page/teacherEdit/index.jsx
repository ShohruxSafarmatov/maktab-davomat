import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BoxElement from "../../components/Box";
import Breadcrumb from "../../components/Breadcrumb";
import { EditTeacher, GetTeacher } from "../../store/actions/teachers";
import { toastError, toastSuccess } from "../../utils/toast";
import { getLocalStorage } from "../../libs/localStorage";

export default function TeachersEdit() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { teachersData, loading } = useSelector((state) => state.teachers);

  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    school: getLocalStorage("school"),
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

  const breadcrumbPaths = [
    { label: "Asosiy sahifa", link: "/" },
    { label: "O'qituvchilar", link: "/teachers" },
    { label: "O'qituvchi tahrirlash" },
  ];

  const fields = [
    { label: "Ism", name: "name", type: "text" },
    { label: "Jinsi", name: "jinsi", type: "radio" },
    { label: "Tug'ilgan sana", name: "tug_sana", type: "date" },
    { label: "Manzil", name: "address", type: "text" },
    { label: "Telefon raqam", name: "phone", type: "text" },
    { label: "Email", name: "email", type: "text" },
    { label: "Kategoriya", name: "category", type: "text" },
    { label: "Ishga qabul qilingan sana", name: "datapriyoma", type: "date" },
    { label: "Eslatma", name: "primech", type: "text" },
  ];

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
    document.getElementById("fileInput").value = null;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    }

    try {
      await dispatch(EditTeacher(data));
      toastSuccess("O'qituvchi muvaffaqiyatli tahrirlandi!");
      navigate("/teachers");
    } catch (err) {
      toastError(err?.message || "Xatolik yuz berdi");
    }
  };

  useEffect(() => {
    dispatch(GetTeacher(getLocalStorage("school")));
  }, []);

  useEffect(() => {
    if (teachersData?.length) {
      const teacher = teachersData.find((item) => item.id == id);
      if (teacher) {
        const {
          id,
          school,
          name,
          jinsi,
          tug_sana,
          address,
          phone,
          email,
          category,
          datapriyoma,
          primech,
          image,
        } = teacher;

        setFormData({
          id: id || "",
          school: school || "",
          name: name || "",
          jinsi: jinsi || "",
          tug_sana: tug_sana || "",
          address: address || "",
          phone: phone || "",
          email: email || "",
          category: category || "",
          datapriyoma: datapriyoma || "",
          primech: primech || "",
          image: null,
        });

        if (image) {
          setPreview(image);
        }
      }
    }
  }, [teachersData, id]);

  const renderField = ({ label, name, type }) => {
    if (type === "radio") {
      return (
        <div key={name} className="radio-group">
          <label>{label}</label>
          <div className="radio-options">
            {["ERKAK", "AYOL"].map((gender) => (
              <label key={gender} className="radio__label">
                {gender === "ERKAK" ? "Erkak" : "Ayol"}
                <input
                  type="radio"
                  name={name}
                  value={gender}
                  checked={formData[name] === gender}
                  onChange={handleChange}
                  required
                />
              </label>
            ))}
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
  };

  return (
    <div className="teachers">
      <Breadcrumb title="O'qituvchi tahrirlash" paths={breadcrumbPaths} />
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
          </div>

          <div className="modal__form-block">{fields.map(renderField)}</div>

          <button className="teacher__add-btn" type="submit">
            Tahrirlash
          </button>
        </form>
      </BoxElement>
    </div>
  );
}
