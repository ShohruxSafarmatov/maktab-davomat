import { useState } from "react";

const AttendanceMonthTable = ({ bodyValue }) => {
  const [sortData, setSortData] = useState({ column: null, direction: null });

  const handleSort = (key) => {
    if (sortData.column !== key) {
      setSortData({ column: key, direction: "asc" });
    } else if (sortData.direction === "asc") {
      setSortData({ column: key, direction: "desc" });
    } else {
      setSortData({ column: null, direction: null });
    }
  };

  const sortedData = (bodyArray) => {
    if (!sortData.column) return bodyArray;

    const sorted = [...bodyArray].sort((a, b) => {
      const aVal = a[sortData.column];
      const bVal = b[sortData.column];

      return sortData.direction === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    return sorted;
  };

  const renderArrow = (key) => {
    if (sortData.column !== key) {
      return (
        <div className="sort__arrows">
          <i className="fa-solid fa-caret-up"></i>
          <i className="fa-solid fa-caret-down"></i>
        </div>
      );
    }

    return sortData.direction === "asc" ? (
      <i className="fa-solid fa-caret-up" style={{ color: "blue" }} />
    ) : (
      <i className="fa-solid fa-caret-down" style={{ color: "blue" }} />
    );
  };

  const dateKeys = bodyValue?.[0] ? Object.keys(bodyValue[0].attendance) : [];

  if (!Array.isArray(bodyValue) || bodyValue.length === 0) {
    return <p>Ma'lumot topilmadi</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Rasm</th>

          <th onClick={() => handleSort("pupilname")}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              Ism {renderArrow("pupilname")}
            </div>
          </th>

          {dateKeys.map((date, index) => (
            <th key={index}>{date.slice(8)}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {sortedData(bodyValue).map((item, id) => (
          <tr key={id}>
            <td>{id + 1}</td>

            <td>
              {item.image ? (
                <img
                  className="attendance__image"
                  src={`https://maktab.bionet.uz/media/${item.image}`}
                  alt={item.pupilname}
                  width="30"
                  height="30"
                  style={{ borderRadius: "50%" }}
                />
              ) : (
                "—"
              )}
            </td>

            <td>{item.pupilname}</td>

            {dateKeys.map((date, index) => {
              const value = item.attendance[date];

              const style = {
                textAlign: "center",
                background: value ? "#d4ffd4" : "#ffd4d4", // yashil / qizil
              };

              return (
                <td key={index} style={style}>
                  {value ? value : "-"}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceMonthTable;
