import express from "express";
import { register, login } from "../controllers/auth.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/register", upload.single("image"), register);
router.post("/login", login);

export default router;
