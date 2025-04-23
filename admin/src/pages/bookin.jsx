
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Booking = () => {
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [booking, setBooking] = useState([]);

  const handleUpdateClick = (bookingItem) => {
    setSelectedBooking(bookingItem);
    setNewStatus(bookingItem.status); // نعرض الحالة الخاصة بالحجز
    setShowModal(true);
  };

  const handleSave = () => {
    const updatedBookings = booking.map((item) =>
      item._id === selectedBooking._id ? { ...item, status: newStatus } : item
    );
    setBooking(updatedBookings);
    setShowModal(false);

    
    // update status
    fetch(`http://localhost:3000/api/booking/update/status/${selectedBooking._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(res => res.json())
      .then((data) => toast.success(data.message))
      .catch((err) => toast.error(err.message));
    
  };

  const handleClose = () => setShowModal(false);

  // get bookings from API
  useEffect(() => {
    const getBook = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await fetch("http://localhost:3000/api/booking/get-all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.status === "success") {
          setBooking(data.data);
        } else {
          console.error("Failed to fetch bookings:", data.message);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    getBook();
  }, []);

  return (
    <>
      <h2 className="text-center p-3">Booking</h2>
      <div className="container">
        <div className="row">
          {booking?.map((item, index) => (
            <div className="col" key={item._id || index}>
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Name: {item.name}</h5>
                  <p className="card-text">Phone: {item.phone}</p>
                  <p className="card-text">Time: {item.time}</p>
                  <p className="card-text">Date: {item.date}</p>
                  <p className="card-text">Status: <strong>{item.status}</strong></p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-warning btn-sm" onClick={() => handleUpdateClick(item)}>
                      Update
                    </button>
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for updating status */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Update Status</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Save
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

export default Booking;
