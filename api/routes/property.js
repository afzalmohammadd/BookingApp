import express from "express";
import { createPropertyType , getTypes } from "../controllers/property.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import { verifyToken, verifyUser ,verifyAdmin} from "../utils/verifyToken.js"

const router = express.Router();

router.post("/create", upload.single("image"), createPropertyType);
router.get("/",verifyAdmin, getTypes)

export default router;