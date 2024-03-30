import express from "express";
import { createHotel,updateHotel,deleteHotel,getHotel,getHotels,countByCity,countByType,getHotelRooms } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

console.log("inside hotel route");
// CREATE
router.post("/create",upload.single("image"), createHotel)

// UPDATE
router.put("/:id",verifyAdmin, updateHotel)
 

// DELETE
router.delete("/find/:id",verifyAdmin, deleteHotel)

// GET
router.get("/find/:id", getHotel)

// GET ALL
router.get("/", getHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/hotels/room/:id", getHotelRooms)


export default router;
