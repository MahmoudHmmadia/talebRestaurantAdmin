import pattern from "../../assets/separator.svg";
import "./pageTitle.scss";
function PageTitle({ title, icon }: { title: string; icon: any }) {
  return (
    <div className="flex flex-column g-1">
      <div className="relative flex g-1 align-center pt-3">
        <h1 className="pageTitle cl-w uppercase letter-s-2 fs-large cool_title">
          {title}
        </h1>
        <div className="flex icon cl-khaled fs-large">{icon}</div>
      </div>
      <div className="image relative z_1">
        <img src={pattern} alt="" />
      </div>
    </div>
  );
}
export default PageTitle;
