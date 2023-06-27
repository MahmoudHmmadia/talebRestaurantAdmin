import { BiEdit } from "react-icons/bi";
import { motion as m } from "framer-motion";
import UseContext, {
  ERROR_MESSAGE,
  employee,
} from "../../../context/UseContext";
import AltButton from "../../../components/altButton";
import { GiMoneyStack, GiReturnArrow } from "react-icons/gi";
import { useRef, useState } from "react";
import myAxios from "../../../api/axios";
function EditCard({
  employee,
  setEditCard,
  getEmployees,
}: {
  employee: employee | undefined;
  setEditCard: React.Dispatch<React.SetStateAction<employee | undefined>>;
  getEmployees: () => void;
}) {
  const { setServerResponse } = UseContext();
  const [valid, setValid] = useState(false);
  const salaryRef = useRef<HTMLInputElement>(null);
  function edit() {
    if (Number.isNaN(+salaryRef.current!.value)) {
      setServerResponse({
        type: "error",
        content: "write a correct data",
      });
      salaryRef.current!.value = "";
      isValid();
    } else
      myAxios
        .post(`/employees/edit/${employee?._id}`, {
          salary: salaryRef.current?.value,
        })
        .then((_res) => {
          setEditCard(undefined);
          setServerResponse({
            type: "edit",
            content: `You Update ${employee?.name} information`,
          });
          getEmployees();
        })
        .catch((_err) => {
          setServerResponse(ERROR_MESSAGE);
        });
  }
  function isValid() {
    salaryRef.current?.value &&
    parseInt(salaryRef.current?.value) !== employee?.salary
      ? setValid(true)
      : setValid(false);
  }
  return (
    <m.div
      className="fixed w-50 card l-50 p-3 dark-box-shadow radius-s flex flex-column g-2 centering-content alt-bg z-100000"
      style={{
        top: "20%",
      }}
      initial={{
        opacity: 0,
        y: 200,
        x: "-50%",
      }}
      animate={{
        opacity: 1,
        y: 0,
        x: "-50%",
      }}
    >
      <div className="flex flex-column g-1 align-center">
        <div className="fs-x-large cl-bl">
          <BiEdit />
        </div>
        <h1 className="cl-bl uppercase">Edit Employee Information</h1>
      </div>
      <div className="flex flex-column g-1 w-100">
        <div className="input-container relative">
          <div
            className="absolute t-50 cl-khaled flex fs-b-small"
            style={{
              transform: "translateY(-50%)",
              left: "5px",
            }}
          >
            <GiMoneyStack />
          </div>
          <input
            type="text"
            placeholder="SALARY"
            defaultValue={employee?.salary}
            className="cl-w main-bg pl-3"
            ref={salaryRef}
            id="edit-salary"
            autoComplete="off"
            onChange={isValid}
          />
        </div>
      </div>
      <div className="flex align-center g-1 w-100">
        <AltButton
          bgColor="green_gradient_bg"
          color="cl-b"
          content="Apply"
          Icon={BiEdit}
          fn={() => edit()}
          valid={valid}
        />
        <AltButton
          bgColor="red_gradient_bg"
          color="cl-b"
          content="Cancel"
          Icon={GiReturnArrow}
          fn={() => setEditCard(undefined)}
          valid={true}
        />
      </div>
    </m.div>
  );
}
export default EditCard;
