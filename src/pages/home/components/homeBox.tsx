type props = {
  icon: any;
  title: string;
  details: number | string;
  bg: string;
};
function HomeBox({ icon, title, details, bg }: props) {
  return (
    <div
      className={`box p-3 radius-s flex flex-column g-1 align-center overflow-hidden ${bg}`}
    >
      <div className="icon cl-b fs-x-large">{icon}</div>
      <h2 className="cl-b uppercase title">{title}</h2>
      <h3 className="details cl-b bold txt-c flex-1">{details}</h3>
    </div>
  );
}
export default HomeBox;
