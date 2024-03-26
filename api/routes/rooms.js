import express from "express"
import { verifyAdmin } from "../utils/verifyToken.js"
import { createRoom,updateRoom,deleteRoom, getRoom, getRooms, updateRoomAvailability } from "../controllers/room.js"

const router = express.Router()

console.log("inside rooms route");

// CREATE
router.post("/:hotelid",verifyAdmin, createRoom)

// UPDATE
router.put("/availability/:id", updateRoomAvailability) 
router.put("/:id",verifyAdmin, updateRoom) 

 

// DELETE
router.delete("/:id/:hotelid",verifyAdmin, deleteRoom)

// GET
router.get("/:id", getRoom)

// GET ALL
router.get("/", getRooms)


export default router