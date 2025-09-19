import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTeacher, GetTeacher } from "../../store/actions/teachers";
import { getLocalStorage } from "../../libs/localStorage";
import { useNavigate } from "react-router-dom";

const TeacherTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teachersData } = useSelector((state) => state.teachers);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleDelete = (id) => {
    dispatch(DeleteTeacher(id)).then(() => {
      dispatch(GetTeacher(getLocalStorage("school")));
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".menu-dropdown")) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    dispatch(GetTeacher(getLocalStorage("school")));
  }, [dispatch]);

  return (
    <div className="table-wrapper">
      <table className="teacher-table">
        <thead>
          <tr>
            <th>№</th>
            <th>Surati</th>
            <th>Ism</th>
            <th>Manzil</th>
            <th>Telefon raqam</th>
            <th>Qabul qilingan sana</th>
            <th>Kategoriya</th>
            <th>Eslatma</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          {teachersData?.map((teacher, index) => (
            <tr key={teacher.id}>
              <td>{index + 1}</td>
              <td className="name-cell">
                <img src={teacher.image} alt="avatar" />
              </td>
              <td>{teacher.name}</td>
              <td>{teacher.address}</td>
              <td>{teacher.phone}</td>
              <td>{teacher.datapriyoma}</td>
              <td>{teacher.category}</td>
              <td>{teacher.primech}</td>
              <td className="action-cell">
                <div className="menu-dropdown">
                  <button
                    className="menu-toggle"
                    onClick={() => toggleDropdown(index)}
                  >
                    ⋮
                  </button>
                  {openIndex === index && (
                    <ul className="dropdown-content">
                      <li onClick={() => navigate("teachers/edit")}>
                        <i className="fa-solid fa-pen"></i> Edit
                      </li>
                      <li onClick={() => handleDelete(teacher.id)}>
                        <i className="fa-solid fa-trash"></i> Delete
                      </li>
                    </ul>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherTable;
