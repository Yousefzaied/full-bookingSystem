import { Link } from "react-router-dom";
import "./style/sideBar.css";

const SidBar = () => {
  return (
    <>
      <div className="sidBar col-lg-2 col-md-4 col-sm-4">
        <h2 className="text-center p-3 title">Booking</h2>
        <div className="links text-center d-block">
          <Link to="/" className="btn btn-primary m-3">service</Link>
          <Link to="/booking" className="btn btn-primary m-3">bookin</Link>
          <Link to="/seeting" className="btn btn-primary m-3">seeting</Link>
        </div>
      </div>
    </>
  );
};

export default SidBar;

