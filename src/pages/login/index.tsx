import Button from "../../components/button";
import useLogin from "../../hooks/useLogin";
import "./login.scss";
import { motion as m } from "framer-motion";
import { FaLock, FaUser } from "react-icons/fa";
function Login() {
  const { isValid, nameRef, passwordRef, valid, login } = useLogin();
  return (
    <div className=" w-100 h-100 login_cover l-0 t-0 fixed">
      <div className="fixed l-0 t-0 w-100 h-100 black-bg opacity-70"></div>
      <div className="login fixed l-50 t-50 p-3 circle translate-50 flex flex-column g-3">
        <m.div
          className={`absolute shadow animated_pattern circle l-50 t-50 translate-50 ${
            isValid ? "cl-khaled shadow" : "cl-t2"
          }`}
          style={{
            width: "121%",
            height: "121%",
            border: "2px solid",
          }}
          initial={{
            borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
          }}
          animate={{
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 40% / 50% 60% 30% 60%",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
            repeatType: "mirror",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        ></m.div>
        <m.div
          className={`absolute shadow animated_pattern circle l-50 t-50 translate-50 ${
            isValid ? "cl-bl shadow" : "cl-t2"
          }`}
          style={{
            width: "125%",
            height: "125%",
            border: "2px solid",
          }}
          initial={{
            borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
          }}
          animate={{
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 40% / 50% 60% 30% 60%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            repeatType: "mirror",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        ></m.div>
        <m.div
          className={`absolute shadow animated_pattern circle l-50 t-50 translate-50 ${
            isValid ? "cl-w shadow" : "cl-t2"
          }`}
          style={{
            width: "129%",
            height: "129%",
            border: "2px solid",
          }}
          initial={{
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
          animate={{
            borderRadius: [
              "30% 60% 70% 40% / 50% 60% 30% 60%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            repeatType: "mirror",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        ></m.div>
        <h1 className="cool_title">Login</h1>
        <div className="flex flex-column g-2 relative">
          <div
            className={`input-container cl-w alt-bg p-1 radius-s relative smooth-3 ${
              isValid ? "valid" : ""
            }`}
          >
            <input
              type="text"
              placeholder="name"
              className="cl-w pl-3"
              ref={nameRef}
              onChange={valid}
            />
            <div className="absolute t-50 flex cl-khaled label">
              <FaUser />
            </div>
          </div>
          <div
            className={`input-container cl-w alt-bg p-1 radius-s relative smooth-3 ${
              isValid ? "valid" : ""
            }`}
          >
            <input
              type="password"
              placeholder="password"
              className="cl-w pl-3"
              ref={passwordRef}
              onChange={valid}
            />
            <div className="absolute t-50 flex cl-khaled label">
              <FaLock />
            </div>
          </div>
          <Button
            content="login"
            outline=""
            altColor="cl-w"
            bgColor="khaled-bg"
            button_circle_bg_color="black-bg"
            fn={login}
            valid={isValid}
          />
        </div>
      </div>
    </div>
  );
}
export default Login;
