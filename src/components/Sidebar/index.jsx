import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { getLocalStorage, setLocalStorage } from "../../libs/localStorage";
import Button from "../Button";

export default function Sidebar() {
  const [profileClick, setProfileClick] = useState(false);
  const [isOpen, setIsOpen] = useState(getLocalStorage("sidebar"));
  const handleProfileClick = () => {
    setProfileClick(!profileClick);
  };

  const sidebarHandleClick = () => {
    setIsOpen(!isOpen);
    setLocalStorage("sidebar", !isOpen);
  };

  return (
    <div className="sidebar">
      <div
        className={
          isOpen ? "sidebar__left" : "sidebar__left" + " sidebar__left-active"
        }
      >
        <i
          onClick={() => sidebarHandleClick()}
          className={
            isOpen ? "fa-solid fa-chevron-left" : "fa-solid fa-chevron-right"
          }
        ></i>
        <Link to="/dashboard">Logo</Link>
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <NavLink
              className={
                isOpen ? "sidebar__link" : "sidebar__link sidebar__link-show"
              }
              to="/dashboard"
            >
              {isOpen ? (
                <>
                  <i className="fa-solid fa-table-cells-large"></i> Dashboard
                </>
              ) : (
                <i className="fa-solid fa-table-cells-large"></i>
              )}
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink
              className={
                isOpen ? "sidebar__link" : "sidebar__link sidebar__link-show"
              }
              to="/teachers"
            >
              {isOpen ? (
                <>
                  <i className="fa-solid fa-table-cells-large"></i>
                  O'qituvchilar
                </>
              ) : (
                <i className="fa-solid fa-table-cells-large"></i>
              )}
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink
              className={
                isOpen ? "sidebar__link" : "sidebar__link sidebar__link-show"
              }
              to="/month-attendance"
            >
              {isOpen ? (
                <>
                  <i className="fa-solid fa-table-cells-large"></i> Oylik
                  davomat
                </>
              ) : (
                <i className="fa-solid fa-table-cells-large"></i>
              )}
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink
              className={
                isOpen ? "sidebar__link" : "sidebar__link sidebar__link-show"
              }
              to={"/classes"}
            >
              {isOpen ? (
                <>
                  <i className="fa-solid fa-table-cells-large"></i> Sinflar
                </>
              ) : (
                <i className="fa-solid fa-table-cells-large"></i>
              )}
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink
              className={
                isOpen ? "sidebar__link" : "sidebar__link sidebar__link-show"
              }
              to={"/attendance"}
            >
              {isOpen ? (
                <>
                  <i className="fa-solid fa-table-cells-large"></i> Smenalar
                </>
              ) : (
                <i className="fa-solid fa-table-cells-large"></i>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="sidebar__right">
        <header>
          <Button
            classButton={"header__button"}
            onClickButton={() => handleProfileClick()}
          >
            <img
              className="header__img"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="user-img"
            />
          </Button>
        </header>
        <div className="outlet__container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
