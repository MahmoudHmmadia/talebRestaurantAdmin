import { motion as m } from "framer-motion";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { BiCalendar, BiImageAdd, BiUser } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";
import AltButton from "../../../components/altButton";
import myAxios from "../../../api/axios";
import UseContext from "../../../context/UseContext";
import { socialIcons } from "../../../constants/data";
type props = {
  setAddEmployee: Dispatch<SetStateAction<undefined | string>>;
  id: string;
  getEmployees: () => void;
  jobTitle: string | undefined;
};
function AddEmployee({ setAddEmployee, id, getEmployees, jobTitle }: props) {
  const { setServerResponse } = UseContext();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const salaryRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const faceBookRef = useRef<HTMLInputElement>(null);
  const instagramRef = useRef<HTMLInputElement>(null);
  const gmailRef = useRef<HTMLInputElement>(null);
  const linkedinRef = useRef<HTMLInputElement>(null);
  function handleValid() {
    nameRef.current?.value &&
    ageRef.current?.value &&
    salaryRef.current?.value &&
    imageRef.current?.files![0]
      ? setValid(true)
      : setValid(false);
  }
  const [valid, setValid] = useState(false);
  function add() {
    if (
      Number.isNaN(+ageRef.current!.value) ||
      Number.isNaN(+salaryRef.current!.value)
    ) {
      setServerResponse({
        type: "error",
        content: "write a correct data",
      });
      ageRef.current!.value = "";
      salaryRef.current!.value = "";
    } else {
      const formData = new FormData();
      formData.append("name", nameRef.current!.value);
      formData.append("age", ageRef.current!.value);
      formData.append("salary", salaryRef.current!.value);
      formData.append("image", imageRef.current?.files![0]!);
      formData.append("image", imageRef.current!.files![0].name);
      formData.append("faceBook", faceBookRef.current!.value);
      formData.append("instagram", instagramRef.current!.value);
      formData.append("linkedin", linkedinRef.current!.value);
      formData.append("gmail", gmailRef.current!.value);
      myAxios
        .post(`employees/add/${id}`, formData)
        .then(() => {
          getEmployees();
          setServerResponse({
            type: "success",
            content: `YOU HAVE A ${jobTitle}`,
          });
          setAddEmployee(undefined);
        })
        .catch(() => {
          setServerResponse({
            type: "error",
            content: "The Server Is Not Working Write Now , Try Again Letter",
          });
        });
    }
  }
  return (
    <m.div
      className="fixed card w-50 l-50 p-3 dark-box-shadow radius-s flex flex-column g-2 centering-content alt-bg z-100000"
      style={{
        top: "5%",
        width: "clamp(50%,95%)",
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
      <div
        className="flex fs-med cl-r absolute r-0 t-0 pointer"
        onClick={() => setAddEmployee(undefined)}
      >
        <IoCloseCircle />
      </div>
      <div className="centering-content g-1">
        <h1 className="txt-c cl-bl uppercase letter-s-1">add employee</h1>
        <div className="flex fs-large cl-m">
          <IoAddCircle />
        </div>
      </div>
      <div className="flex g-2 w-100 flex-column">
        <div className="input-container relative w-100">
          <label
            className="absolute cl-khaled fs-b-small flex t-50"
            style={{
              left: "8px",
              transform: "translateY(-50%)",
            }}
            htmlFor="emp-name"
          >
            <BiUser />
          </label>
          <input
            type="text"
            id="emp-name"
            placeholder="NAME"
            className="cl-w main-bg radius-s pl-3"
            style={{
              borderBottom: "1px solid #aaa",
            }}
            onChange={handleValid}
            ref={nameRef}
            autoComplete="off"
          />
        </div>
        <div className="input-container relative w-100">
          <label
            className="absolute cl-khaled fs-b-small flex t-50"
            style={{
              left: "8px",
              transform: "translateY(-50%)",
            }}
            htmlFor="emp-salary"
          >
            <GiMoneyStack />
          </label>
          <input
            type="text"
            id="emp-salary"
            placeholder="SALARY"
            className="cl-w main-bg radius-s pl-3"
            style={{
              borderBottom: "1px solid #aaa",
            }}
            onChange={handleValid}
            autoComplete="off"
            ref={salaryRef}
          />
        </div>
        <div className="input-container relative w-100">
          <label
            className="absolute cl-khaled fs-b-small flex t-50"
            style={{
              left: "8px",
              transform: "translateY(-50%)",
            }}
            htmlFor="emp-age"
          >
            <BiCalendar />
          </label>
          <input
            type="text"
            id="emp-age"
            placeholder="AGE"
            className="cl-w main-bg radius-s pl-3"
            style={{
              borderBottom: "1px solid #aaa",
            }}
            onChange={handleValid}
            autoComplete="off"
            ref={ageRef}
          />
        </div>
      </div>
      <div className="grid align-center w-100 social_container">
        {socialIcons.map((i) => (
          <div
            className="radius p-1 flex flex-column g-1 align-center"
            key={i.color}
          >
            <div
              className="fs-large"
              style={{
                color: i.color,
              }}
            >
              <i.Icon />
            </div>
            <input
              type="text"
              placeholder={i.name}
              id="emp-facebook"
              autoComplete="off"
              className="cl-w main-bg fs-small radius-s"
              style={{
                border: `1px solid ${i.color}`,
              }}
              ref={
                i.name == "facebook"
                  ? faceBookRef
                  : i.name == "instagram"
                  ? instagramRef
                  : i.name == "linkedin"
                  ? linkedinRef
                  : gmailRef
              }
            />
          </div>
        ))}
      </div>
      <div className="input-container relative w-100">
        <m.label
          htmlFor="file"
          className="relative sunny_gradient_bg cl-b p-2 pointer w-100 centering-content uppercase bold letter-s-1 g-1"
          whileHover={{
            scale: 0.9,
          }}
        >
          <span>add image</span>
          <span className="flex fs-med">
            <BiImageAdd />
          </span>
          <input
            type="file"
            id="file"
            className="d-none"
            onChange={handleValid}
            ref={imageRef}
            name="image"
          />
        </m.label>
      </div>

      <AltButton
        bgColor="blue_gradient_bg"
        color="cl-b"
        content="add employee"
        Icon={IoAddCircle}
        valid={valid}
        width="w-100"
        fn={add}
      />
    </m.div>
  );
}
export default AddEmployee;
