
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style/register.css";

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      toast.success("Login Success");
      navigate("/");
    } else {
      toast.error("Faild In Login");
    }
  };

  return (
    <div className="container regiter d-flex justify-content-center align-center">
      <form onSubmit={handleOnSubmit}>
        <h2 className="text-center">Register</h2>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="name"
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            placeholder="email"
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="password"
            onChange={handleOnChange}
            required
          />
        </div>

        <button className="btn btn-primary m-1">Register</button>

        <div className="text-center">
          Already have an account?
          <button
            type="button"
            className="btn btn-link m-2 p-0"
            onClick={onSwitchToLogin}
          >
            Login
          </button>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Register;
