
import { useEffect, useState } from "react";
import AddService from "./addService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Service = () => {
  const [service, setService] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [selectedservice, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateClick = (bookingItem) => {
    setSelectedService(bookingItem);
    setNewStatus(bookingItem.status);
    setFormData({
      title: bookingItem.title,
      description: bookingItem.description,
      price: bookingItem.price,
    });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  // update-service
  const handleSave = () => {
    const updatedBookings = service.map((item) =>
      item._id === selectedservice._id
        ? { ...item, title: formData.title, description: formData.description, price: formData.price, status: newStatus }
        : item
    );
    setService(updatedBookings);
    setShowModal(false);

    fetch(`http://localhost:3000/api/service/updata/${selectedservice._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        price: formData.price,
        status: newStatus,
      }),
    })
      .then((res) => res.json())
      .then((data) => toast.success(data.message))
      .catch((err) => toast.error(err.message));
      
  };

  //  get-service
  const getService = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch("http://localhost:3000/api/service/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.status === "success") {
        setService(data.data);
      } else {
        console.error("Failed to fetch bookings:", data.message);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // delete-service
  const deleteService = async (_id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const res = await fetch(`http://localhost:3000/api/service/delete/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.message === "success") {
        setService((prevData) => prevData.filter((item) => item._id !== _id));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  useEffect(() => {
    getService();
  }, []);

  return (
    <>
      <h2 className="text-center p-3">Services</h2>
      <div className="container">
        <div className="row">
          <div className="container text-center">
            <div className="row align-items-start">
              {service?.map((data, index) => {
                return (
                  <div className="col" key={index}>
                    <div className="card" style={{ width: "18rem" }}>
                      <div className="card-body">
                        <h5 className="card-title">{data.title}</h5>
                        <p className="card-text">{data.description}</p>
                        <h6 className="card-subtitle mb-3 text-muted">${data.price}</h6>
                        <div className="d-flex justify-content-between">
                          <button className="btn btn-warning btn-sm" onClick={() => handleUpdateClick(data)}>
                            Update
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => deleteService(data._id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <AddService onAddSuccess={getService} />
      </div>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Update Service</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer/>
    </>
  );
};

export default Service;
