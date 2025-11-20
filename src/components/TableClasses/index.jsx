import { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClassesDelete, ClassesGet } from "../../store/actions/classes";
import { getLocalStorage } from "../../libs/localStorage";
import { Link } from "react-router-dom";

const TableClasses = ({ setIsOpenEdit }) => {
  const dispatch = useDispatch();
  const { dataClasses } = useSelector((state) => state.classes);
  const dropdownRef = useRef(null);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = ({ index }) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const enhancedData = useMemo(() => {
    if (!Array.isArray(dataClasses)) return [];

    return dataClasses.map((item) => {
      const total = item.total_students || 0;
      const present = item.present_students || 0;
      const absent = total - present;

      return {
        id: item.id,
        className: item.name,
        total,
        present,
        absent,
        attendance: total > 0 ? ((present / total) * 100).toFixed(1) : 0,
      };
    });
  }, [dataClasses]);

  const sortedData = useMemo(() => {
    let sortable = [...enhancedData];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (typeof aVal === "string") {
          return sortConfig.direction === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        } else {
          return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        }
      });
    }
    return sortable;
  }, [enhancedData, sortConfig]);

  const handleSort = (key) => {
    if (sortConfig.key !== key) {
      setSortConfig({ key, direction: "asc" });
    } else if (sortConfig.direction === "asc") {
      setSortConfig({ key, direction: "desc" });
    } else {
      setSortConfig({ key: null, direction: null });
    }
  };

  const renderArrow = (key) => {
    if (sortConfig.key !== key)
      return (
        <div className="sort__arrows">
          <i className="fa-solid fa-caret-up"></i>
          <i className="fa-solid fa-caret-down"></i>
        </div>
      );

    if (sortConfig.direction === "asc") {
      return <i className="fa-solid fa-caret-up" style={{ color: "blue" }}></i>;
    } else if (sortConfig.direction === "desc") {
      return (
        <i className="fa-solid fa-caret-down" style={{ color: "blue" }}></i>
      );
    }
    return null;
  };

  const handleDelete = async (classesId) => {
    await dispatch(ClassesDelete(classesId));
    dispatch(ClassesGet(getLocalStorage("school")));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th onClick={() => handleSort("className")}>
            Sinf nomi {renderArrow("className")}
          </th>
          <th onClick={() => handleSort("total")}>
            O'quvchilar soni {renderArrow("total")}
          </th>
          <th onClick={() => handleSort("present")}>
            Kelganlar soni {renderArrow("present")}
          </th>
          <th onClick={() => handleSort("attendance")}>
            Davomat (%) {renderArrow("attendance")}
          </th>
          <th onClick={() => handleSort("absent")}>
            Kelmaganlar soni {renderArrow("absent")}
          </th>
          <th>Amallar</th>
        </tr>
      </thead>

      <tbody>
        {sortedData.map((row, idx) => (
          <tr key={row.id}>
            <td>{idx + 1}</td>
            <td>
              <Link to={`/classes/${row.id}`}>{row.className}</Link>
            </td>
            <td>{row.total}</td>
            <td>{row.present}</td>
            <td>{row.attendance}%</td>
            <td>{row.absent}</td>
            <td className="action-cell">
              <div className="menu-dropdown" ref={dropdownRef}>
                <button
                  className="menu-toggle"
                  onClick={() => toggleDropdown({ index: idx, classesId: row })}
                >
                  ⋮
                </button>
                {openIndex === idx && (
                  <ul className="dropdown-content">
                    <li
                      onClick={() =>
                        setIsOpenEdit({
                          edit: true,
                          classesData: dataClasses,
                          classesId: row.id,
                        })
                      }
                    >
                      <i className="fa-solid fa-pen"></i> Tahrirlash
                    </li>
                    <li onClick={() => handleDelete(row.id)}>
                      <i className="fa-solid fa-trash"></i> O'chirish
                    </li>
                  </ul>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableClasses;
