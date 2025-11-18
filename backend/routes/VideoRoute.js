// routes/videoRoutes.js
import express from "express";
import multer from "multer";
import { uploadVideo } from "../controllers/VideoController.js";
import {getSignedVideoUrl} from "../controllers/GetSignedUrl.js"
import { jwtCheck } from "../auth/auth0.js"


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


router.post("/upload",jwtCheck,upload.single("video"),(req,res,next)=>{
    console.log("token: ",req.auth.token);
    console.log("token received:", req.headers.authorization);

    next();
},uploadVideo);
// router.get("/signed-url/:key(*)", getSignedVideoUrl); //won't work in latest node and express version
// router.get("/signed-url/*", getSignedVideoUrl); // won't work in current version
router.get(/^\/signed-url\/(.+)/, getSignedVideoUrl); //reg-ex is the modern way
export default router;
