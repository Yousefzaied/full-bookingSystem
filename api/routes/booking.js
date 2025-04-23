// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/authMiddleware");
// const adminMiddleware = require("../middleware/adminMiddleware");
// const Booking = require("../models/booking");
// const Service = require("../models/service");

// // Add => user
// router.post("/add", authMiddleware, async (req, res) => {
//     try {
//       const { name, phone, time, date, service} = req.body;
//       const userId = req.user.id;
//       const serviceId = req.service.id; 
  
//       const newBooking = new Booking({
//         name,
//         phone,
//         user: userId,
//         time,
//         date,
//         service:serviceId,
//     });
//       await newBooking.save();
//       res.status(200).json({ status: "success", data: newBooking });
  
//     } catch (error) {
//       console.error("Error in booking:", error);
//       res.status(500).json({ status: "fail", message: "Something went wrong" });
//     }
// });

// // getMy => user
// router.get("/get-my", authMiddleware, async (req, res) => {
//   try {
//     const myBookings = await Booking.find({ user: req.user.id })
//       .populate("service", "title description price"); // هنا بنرجع بيانات الخدمة المطلوبة فقط

//     res.status(200).json({ status: "success", data: myBookings });
//   } catch (error) {
//     console.error("Error in booking:", error);
//     res.status(500).json({ status: "fail", message: "Something went wrong" });
//   }
// });


// // get all => Admin
// router.get("/get-all", adminMiddleware,async (req, res) => {
//   try{
//         const allBooking = await Booking.find();
//         res.status(200).json({status:"success", data:allBooking});

//   } catch (error) {
//     console.error("Error in booking:", error);
//     res.status(500).json({ status: "fail", message: "Something went wrong" });
//     }
// });

// //update => ['pending', 'approved', 'rejected'] => [Admin]
// router.post("/update/status/:id", adminMiddleware,async (req, res) => {
//   try {
//         const {id} = req.params;
//         const {status} = req.body;
//         const updateStatus = await Booking.findByIdAndUpdate(id, {status},{ new: true });
//         res.status(200).json({status:"success",message: "status updated success" ,data:updateStatus});

//   } catch (error) {
//     console.error("Error in booking:", error);
//     res.status(500).json({ status: "fail", message: "Something went wrong" });
//     }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const Booking = require("../models/booking");
const Service = require("../models/service");

// Add => user
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { name, phone, time, date, service } = req.body;
    const userId = req.user.id;

    const newBooking = new Booking({
      name,
      phone,
      user: userId,
      time,
      date,
      service // هنا بناخد الـ service ID مباشرة من الـ body
    });

    await newBooking.save();
    res.status(200).json({ status: "success", data: newBooking });

  } catch (error) {
    console.error("Error in booking:", error);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
});

// getMy => user
router.get("/get-my", authMiddleware, async (req, res) => {
  try {
    const myBookings = await Booking.find({ user: req.user.id })
      .populate("service", "title description price"); // عرض بيانات الخدمة فقط

    res.status(200).json({ status: "success", data: myBookings });
  } catch (error) {
    console.error("Error in booking:", error);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
});

// get all => Admin
router.get("/get-all", adminMiddleware, async (req, res) => {
  try {
    const allBooking = await Booking.find();
    res.status(200).json({ status: "success", data: allBooking });

  } catch (error) {
    console.error("Error in booking:", error);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
});

// update => ['pending', 'approved', 'rejected'] => [Admin]
router.post("/update/status/:id", adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updateStatus = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({
      status: "success",
      message: "status updated success",
      data: updateStatus
    });

  } catch (error) {
    console.error("Error in booking:", error);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
});

module.exports = router;
