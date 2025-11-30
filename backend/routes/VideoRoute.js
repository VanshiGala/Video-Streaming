// routes/videoRoutes.js
import express from "express";
import multer from "multer";
import { uploadVideo } from "../controllers/VideoController.js";
import {getSignedVideoUrl} from "../controllers/GetSignedUrl.js"
import { jwtCheck } from "../auth/auth0.js"
import Video from "../models/Video.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


router.post("/upload",jwtCheck,upload.single("video"),(req,res,next)=>{
    console.log("token: ",req.auth.token);
    console.log("token received:", req.headers.authorization);

    next();
},uploadVideo);
// router.get("/signed-url/:key(*)", getSignedVideoUrl); //won't work in latest node and express version
 //router.get("/signed-url", getSignedVideoUrl); // won't work in current version
router.get(/^\/signed-url\/(.+)/, getSignedVideoUrl); //reg-ex is the modern way
//to get signed url in browser -> route is -> signed-url/key


//list all videos
router.get("/all", async (req, res) => {
    const videos = await Video.find({});
    res.json(videos);
});

export default router;
