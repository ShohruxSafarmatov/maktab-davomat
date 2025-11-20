const StudentsTable = ({ dataMonthAttendance, month, year }) => {
  if (!dataMonthAttendance || !month || !year) {
    return <p>Ma'lumot yuklanmoqda...</p>;
  }

  const students = dataMonthAttendance;

  // Oydagi kunlar soni
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Sana formatlash: 2025-11-01
  const formatDate = (y, m, d) => {
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    return `${y}-${mm}-${dd}`;
  };

  return (
    <div className="table__wrapper">
      <table className="attendance__table" border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Surati</th>
            <th>F.I.O</th>
            {daysArray.map((d) => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {students.map((p) => (
            <tr key={p.pupil_id}>
              <td>
                {p.image ? (
                  <img
                    src={`https://maktab.bionet.uz/media/${p.image}`}
                    alt=""
                    width="40"
                    height="40"
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  "No image"
                )}
              </td>

              <td>{p.pupilname}</td>

              {daysArray.map((day) => {
                const dateKey = formatDate(year, month, day);
                const value = p.attendance[dateKey];

                return (
                  <td
                    key={day}
                    style={{
                      textAlign: "center",
                      background: value ? "#d4ffd4" : "#ffd4d4",
                    }}
                  >
                    {value ? "+" : "-"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
