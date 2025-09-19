import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AttendanceRespPost } from "../../store/actions/attendance";

export default function CardStatisticRes() {
  const dispatch = useDispatch();
  const { dataRes } = useSelector((state) => state.attendance);

  useEffect(() => {
    dispatch(AttendanceRespPost());
  }, [dispatch]);

  const fields = [
    { key: "maktabsoni", label: "Maktablar soni", color: "#FEC400" },
    { key: "bolasoni", label: "O‘quvchilar soni", color: "#FFB200" },
    { key: "kelganlar", label: "Kelganlar soni", color: "#FFD97D" },
    { key: "kelmaganlar", label: "Kelmaganlar soni", color: "#FFEFCB" },
  ];

  return (
    <ul className="statistic__list">
      {dataRes?.map((regionArray) => {
        const item = regionArray[0];
        if (!item?.viloyat) return null;

        return (
          <li className="statistic__item" key={item.viloyat_id}>
            <h2 className="statistic__item-title">{item.viloyat}</h2>
            <div className="statistic__item-body">
              {fields.map((field) => (
                <div className="statistic__item-field" key={field.key}>
                  <span
                    className="statistic__item-color"
                    style={{
                      backgroundColor: field.color,
                    }}
                  ></span>
                  {field.label}: {item[field.key] ?? 0}
                </div>
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
