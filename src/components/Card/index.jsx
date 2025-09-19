import { useDispatch, useSelector } from "react-redux";
import {
  boyIcon,
  girlIcon,
  schoolIcon,
  studentsIcon,
  teachersIcon,
} from "../../assets";
import { HeaderChartPost } from "../../store/actions/attendance";
import { useEffect, useState } from "react";

export default function Cards() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.attendance);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    dispatch(
      HeaderChartPost({
        sana: date,
      })
    );
  }, [dispatch, date]);

  const cardData = [
    { key: "maktabsoni", label: "Maktablar", icon: schoolIcon },
    { key: "ustozsoni", label: "Ustozlar", icon: teachersIcon },
    { key: "jami_uquvchilar", label: "O'quvchilar", icon: studentsIcon },
    { key: "bolalar", label: "Bolalar", icon: boyIcon },
    { key: "qizlar", label: "Qizlar", icon: girlIcon },
  ];

  const item = data?.flat()?.[0];

  return (
    <ul className="card__list">
      {item &&
        cardData.map((card, i) => (
          <li className="card__item" key={i}>
            <div className="card__left-bar"></div>
            <div className="card__icon-box">
              <img className="card__img" src={card.icon} alt={card.label} />
            </div>
            <div className="card__divider"></div>
            <div className="card__info-box">
              <span className="card__label">{card.label}</span>
              <span className="card__count">{item[card.key]}</span>
            </div>
          </li>
        ))}
    </ul>
  );
}
