import { useEffect, useState } from "react";
import myAxios from "../api/axios";
import UseContext, { ERROR_MESSAGE, employee } from "../context/UseContext";

function useEmployees() {
  const { setServerResponse } = UseContext();
  const [employees, setEmployees] = useState<undefined | employee[]>();
  const [card, setCard] = useState<undefined | employee>(undefined);
  const [firedCard, setFiredCard] = useState(false);
  const [addEmployee, setAddEmployee] = useState<undefined | string>();
  function fired(id: string) {
    myAxios
      .post(`employees`, { id })
      .then((res) => {
        setServerResponse({
          type: "fired",
          content: res.data.message,
        });
        getEmployees();
      })
      .catch(() => setServerResponse(ERROR_MESSAGE));
  }
  function getEmployees() {
    myAxios
      .get("employees")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch(() => setServerResponse(ERROR_MESSAGE));
  }
  useEffect(() => {
    getEmployees();
  }, []);
  return {
    fired,
    setCard,
    card,
    firedCard,
    setFiredCard,
    employees,
    addEmployee,
    setAddEmployee,
    setEmployees,
    getEmployees,
  };
}
export default useEmployees;
