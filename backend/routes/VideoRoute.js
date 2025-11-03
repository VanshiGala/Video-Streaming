// routes/videoRoutes.js
import express from "express";
import multer from "multer";
import { uploadVideo } from "../controllers/VideoController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/videos/upload
router.post("/upload", upload.single("video"), uploadVideo);

export default router;
