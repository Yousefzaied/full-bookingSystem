import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navebar";
import SidBar from "./components/sidBar";
import Home from "./pages/Home";
import Service from "./pages/service";
import Booking from "./pages/bookin";
import Setting from "./pages/setting";

function App() {
  return (
    <>
      <NavBar />
      <div className="row m-0">
        <SidBar />
        <div className="col-lg-10 col-md-8 col-sm-8 main">
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Service />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/seeting" element={<Setting />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
