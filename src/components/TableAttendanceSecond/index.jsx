import { useState } from "react";
import BoxElement from "../../components/Box";
import { Link } from "react-router-dom";

const AttendanceTableSecond = ({ headValue, bodyValue }) => {
  const [sortData, setsortData] = useState({ column: null, direction: null });
  const handleSort = (key) => {
    if (sortData.column !== key) {
      setsortData({ column: key, direction: "asc" });
    } else if (sortData.direction === "asc") {
      setsortData({ column: key, direction: "desc" });
    } else if (sortData.direction === "desc") {
      setsortData({ column: null, direction: null });
    }
  };
  const sortedData = (bodyArray) => {
    if (!sortData.column) return bodyArray;

    const sorted = [...bodyArray].sort((a, b) => {
      const aVal = a[sortData.column];
      const bVal = b[sortData.column];

      if (!isNaN(aVal) && !isNaN(bVal)) {
        return sortData.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

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
      <i className="fa-solid fa-caret-up" style={{ color: "blue" }}></i>
    ) : (
      <i className="fa-solid fa-caret-down" style={{ color: "blue" }}></i>
    );
  };

  return (
    <>
      {Array.isArray(bodyValue) && bodyValue.length === 0 ? (
        <p>Ma'lumot topilmadi</p>
      ) : (
        <table>
          <thead>
            <tr>
              {headValue.map((head, index) => (
                <th
                  key={index}
                  onClick={() => {
                    if (head.key !== "index") handleSort(head.key);
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      columnGap: "5px",
                      alignItems: "center",
                    }}
                  >
                    {head.label}
                    {head.key !== "index" && renderArrow(head.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData(bodyValue)?.map((item, id) => {
              return (
                <tr key={id}>
                  <td>{id + 1}</td>
                  <td>
                    <Link to={`/classes/${item.sinf_id}`}>{item.sinfnomi}</Link>
                  </td>
                  <td>{item.bolasoni}</td>
                  <td>{item.kelganlar}</td>
                  <td>{item.kelmaganlar}</td>
                  <td>{item.foizi}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AttendanceTableSecond;
