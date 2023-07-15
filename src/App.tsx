import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Login from "./pages/login";
import "./sass/app.scss";
import Home from "./pages/home";
import Employs from "./pages/employees";
import Orders from "./pages/orders";
import FeedBacks from "./pages/feedBacks";
import UseContext from "./context/UseContext";
import ServerResponse from "./components/serverResponse";

function App() {
  const { serverResponse, loading, auth } = UseContext();
  return (
    <div className="app relative grid">
      {loading && (
        <>
          <div className="fixed w-100 h-100 t-0 l-0 alt-bg opacity-90 z-10000"></div>
          <div className="loader z-100000"></div>
        </>
      )}
      {serverResponse && (
        <>
          <div className="fixed w-100 h-100 t-0 l-0 alt-bg opacity-90 z-10000"></div>
          <ServerResponse response={serverResponse} />
        </>
      )}
      {!auth ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      ) : (
        <>
          <div className="relative z_1">
            <Sidebar />
          </div>
          <div className="app-content p-2">
            <div className="absolute l-0 t-0 w-100 h-100 alt-bg opacity-90"></div>
            <div className="relative">
              <Routes>
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="/employees" element={<Employs />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/feedBacks" element={<FeedBacks />} />
                  <Route path="*" element={<Home />} />
                </Route>
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
