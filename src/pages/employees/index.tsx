import { BsPeopleFill } from "react-icons/bs";
import PageTitle from "../../components/pageTitle";
import "./employees.scss";
import { BiEdit } from "react-icons/bi";
import { CgCloseR } from "react-icons/cg";
import useEmployees from "../../hooks/useEmployees";
import FiredCard from "./components/FiredCard";
import EditCard from "./components/editCard";
import UseContext from "../../context/UseContext";
import ServerResponse from "../../components/serverResponse";
import { CiWarning } from "react-icons/ci";
import AltButton from "../../components/altButton";
import AddEmployee from "./components/AddEmployee";
function Employs() {
  const {
    fired,
    card,
    setCard,
    firedCard,
    setFiredCard,
    employees,
    addEmployee,
    setAddEmployee,
    getEmployees,
  } = useEmployees();
  const { serverResponse } = UseContext();
  return (
    <div className="employees flex flex-column g-3 align-center">
      {serverResponse && <ServerResponse response={serverResponse} />}
      {card && firedCard && (
        <>
          <div className="fixed l-0 t-0 w-100 h-100 black-bg opacity-70 z-10000"></div>
          <FiredCard
            employee={card && card}
            setFiredCard={setCard}
            fired={fired}
          />
        </>
      )}
      {card && !firedCard && (
        <>
          <div className="fixed l-0 t-0 w-100 h-100 black-bg opacity-70 z-10000"></div>
          <EditCard
            employee={card && card}
            setEditCard={setCard}
            getEmployees={getEmployees}
          />
        </>
      )}
      {addEmployee && (
        <>
          <div className="fixed l-0 t-0 w-100 h-100 black-bg opacity-70 z-10000"></div>
          <AddEmployee
            setAddEmployee={setAddEmployee}
            id={addEmployee}
            getEmployees={getEmployees}
            jobTitle={
              employees?.filter((e) => e._id == addEmployee)[0].jobTitle
            }
          />
        </>
      )}
      <PageTitle icon={<BsPeopleFill />} title="employs" />
      <div className="employees_boxes w-100">
        {employees?.map((person) => (
          <div
            className="box p-2 radius-s alt-bg dark-box-shadow flex flex-column g-3 justify-center"
            key={person._id}
          >
            {person.image === "" ? (
              <div className="flex flex-column g-2 align-center">
                <div className="flex fs-x-large cl-m">
                  <CiWarning />
                </div>
                <h3 className="txt-c uppercase neon">
                  You Need a {person.jobTitle}
                </h3>
                <div className="fs-small">
                  <AltButton
                    bgColor="khaled-bg"
                    color="cl-b"
                    content={`HIRED a ${person.jobTitle}`}
                    width="w-100"
                    valid={true}
                    fn={() => setAddEmployee(person._id)}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="image centering-content circle cl-khaled">
                  <img
                    src={`https://www.talebRestaurantApi.onrender.com/assets/${person?.image}`}
                    alt="EMPLOYEE"
                    width={100}
                    className="circle fit-cover"
                    style={{
                      boxShadow: "0 0 0 4px #000,0 0 0 8px",
                      aspectRatio: 1 / 1,
                    }}
                  />
                </div>
                <div className="flex flex-column g-1">
                  <div className="flex uppercase align-center g-1 flex-wrap">
                    <h5>name :</h5>
                    <h5 className="cl-t">{person.name}</h5>
                  </div>
                  <div className="flex uppercase align-center g-1 flex-wrap">
                    <h5>age :</h5>
                    <h5 className="cl-t">{person.age}</h5>
                  </div>
                  <div className="flex uppercase align-center g-1 flex-wrap">
                    <h5>salary :</h5>
                    <h5 className="cl-g bold">{person.salary}$</h5>
                  </div>
                  <div className="flex uppercase align-center g-1 flex-wrap">
                    <h5>job title :</h5>
                    <h5 className="cl-t">{person.jobTitle}</h5>
                  </div>
                  <div
                    className="w-100"
                    style={{
                      height: "1px",
                      backgroundColor: "#aaa",
                    }}
                  ></div>
                  <div className="flex align-center g-1 fs-small">
                    <AltButton
                      bgColor="blue_gradient_bg"
                      color="cl-b"
                      content="edit"
                      Icon={BiEdit}
                      fn={() => {
                        setCard(person);
                        setFiredCard(false);
                      }}
                      valid={true}
                    />
                    <AltButton
                      bgColor="red_gradient_bg"
                      color="cl-b"
                      content="fired"
                      Icon={CgCloseR}
                      fn={() => {
                        setCard(person);
                        setFiredCard(true);
                      }}
                      valid={true}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Employs;
