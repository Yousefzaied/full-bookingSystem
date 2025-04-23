import { Link } from "react-router-dom";

const NavBar = () => {
    return ( 
        <>
        <div className="nave d-flex justify-content-around align-items-center p-3">
            <h2>Admin Profile</h2>
            {/* <Link to={"/register"}> */}
            <button className="btn btn-primary">Service Attack</button>
            {/* </Link> */}
        </div>
        </>
    );
}
export default NavBar;