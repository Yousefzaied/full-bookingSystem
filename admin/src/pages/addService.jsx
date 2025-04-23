
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style/service.css";

const AddService = ({ onAddSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addService = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch("http://localhost:3000/api/service/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Fetched Data:", data);

      if (data.status === "success") {
        toast.success("Service Add Success")
        setFormData({ title: "", description: "", price: "" });

        if (onAddSuccess) {
          onAddSuccess(); // notify parent
        }
      } else {
        console.error("Failed to add service:", data.message);
      }
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addService();
  };

  return (
    <>
      <h2 className="text-center pt-5">Add Service</h2>
      <div className="form-service">
      <form className="m-3" onSubmit={handleSubmit}>
        <div className="m-2">
          <label htmlFor="title">Title</label>
          <input
            className="form-control"
            type="text"
            id="title"
            name="title"
            placeholder="Add title"
            required
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="m-2">
          <label htmlFor="description">Description</label>
          <input
            className="form-control"
            type="text"
            id="description"
            name="description"
            placeholder="Add description"
            required
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="m-2">
          <label htmlFor="price">Price</label>
          <input
            className="form-control"
            type="number"
            id="price"
            name="price"
            placeholder="Add price"
            required
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>

        <button className="btn btn-success m-3">Save</button>
      </form>
      </div>
      <ToastContainer/>
    </>
  );
};

export default AddService;
