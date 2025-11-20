import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/TableClasses";
import ClassesAdd from "../classesAdd";
import ClassesEdit from "../../components/classesEdit";
import { ClassesGet } from "../../store/actions/classes";
import { useDispatch } from "react-redux";
import { getLocalStorage } from "../../libs/localStorage";
import TableClasses from "../../components/TableClasses";

export default function Classes() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [classesData, setClassesData] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ClassesGet(getLocalStorage("school")));
  }, [refresh]);

  return (
    <>
      <div className="classes__btns">
        <Button
          classButton={"teacher__add-btn"}
          onClickButton={() => setIsOpen(!isOpen)}
        >
          Sinf qo'shish
        </Button>
      </div>
      <div className="table__wrapper">
        <TableClasses
          refresh={refresh}
          setIsOpenEdit={setIsOpenEdit}
          setClassesData={setClassesData}
        />
      </div>
      {isOpen && <ClassesAdd setIsOpen={setIsOpen} setRefresh={setRefresh} />}
      {isOpenEdit && (
        <ClassesEdit
          setIsOpenEdit={setIsOpenEdit}
          setRefresh={setRefresh}
          classesData={isOpenEdit.classesData}
          classesId={isOpenEdit.classesId}
        />
      )}
    </>
  );
}
