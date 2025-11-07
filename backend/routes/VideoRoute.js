// routes/videoRoutes.js
import express from "express";
import multer from "multer";
import { uploadVideo } from "../controllers/VideoController.js";
import {getSignedVideoUrl} from "../controllers/GetSignedUrl.js"

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("video"), uploadVideo);
// router.get("/signed-url/:key(*)", getSignedVideoUrl); //won't work in latest node and express version
// router.get("/signed-url/*", getSignedVideoUrl); // won't work in current version
router.get(/^\/signed-url\/(.+)/, getSignedVideoUrl); //reg-ex is the modern way
export default router;
