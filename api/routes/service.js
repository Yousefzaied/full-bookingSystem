const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");
const Service = require("../models/service");


// add service => Admin 
router.post("/add",adminMiddleware ,async (req, res) => {

    try{
        const {title, description, price} = req.body;

        const newService = new Service({title, description, price});
        await newService.save();

        res.status(200).json({status:"success", data:newService});

    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ status: "fail", message: "Something went wrong" });
    }
});

// get all => user 
router.get("/get", async (req, res) => {
    try {

        const allService = await Service.find();
        res.status(200).json({status:"success", data:allService});
        
    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ status: "fail", message: "Something went wrong" });
    }
});

// update => Admin
router.post("/updata/:id", adminMiddleware,async (req, res) => {
    try {
        const {id} = req.params;
        const {title, description, price} = req.body;
        const updateService = await Service.findByIdAndUpdate(id, {title, description, price});
        res.status(200).json({status:"success",message: "Service updated success" ,data:updateService});
        
    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ status: "fail", message: "Something went wrong" });
    }
});

// delete => Admin
router.delete("/delete/:id", adminMiddleware,async (req, res)=>{
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({status:"success", message:"Srvice has been deleted"});

    }catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ status: "fail", message: "Something went wrong" });
    }
    
})
module.exports = router;
