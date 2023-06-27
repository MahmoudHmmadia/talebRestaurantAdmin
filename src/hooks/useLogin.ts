import { useRef, useState } from "react";
import myAxios from "../api/axios";
import UseContext, { ERROR_MESSAGE } from "../context/UseContext";

function useLogin() {
  const { setAuth, setServerResponse } = UseContext();
  const [isValid, setIsValid] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function valid() {
    nameRef.current?.value && passwordRef.current?.value
      ? setIsValid(true)
      : setIsValid(false);
  }
  function login() {
    myAxios
      .post("/auth", {
        name: nameRef.current?.value,
        password: passwordRef.current?.value,
      })
      .then((_res) => {
        setAuth(true);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          setServerResponse({
            type: "error",
            content: err.response.data.message,
          });
        } else {
          setServerResponse(ERROR_MESSAGE);
        }
        passwordRef.current!.value = "";
        nameRef.current!.value = "";
        valid();
      });
  }
  return { isValid, nameRef, passwordRef, valid, login };
}
export default useLogin;
