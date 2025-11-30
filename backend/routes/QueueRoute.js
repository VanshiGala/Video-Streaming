import express from "express";
import { myQueue } from "../Queue/queue.js";
import {addVideoJob} from "../Queue/videoQueue.js"

const router = express.Router();

router.post("/add-job", async (req, res) => {
  const data = req.body;
  const job = await myQueue.add("my-job", data);
  res.json({ success: true, jobId: job.id });
});

//email
router.post("/add-email", async (req, res) => {
  try {
    const { to, subject } = req.body; //send raw data in postman
     if (!to || !subject) {
      return res.status(400).json({ error: "Missing 'to' or 'subject'" });
    }
    const job = await myQueue.add("email", { to, subject });
    res.json({ success: true, jobId: job.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add job" });
  }
});

//video
router.post("/add-video", async(req,res)=>{ //send raw data in postman for testing
  try{
  const {userId, videoPath} = req.body;
  console.log("Body : ",req.body)
  if (!userId || !videoPath){
    console.log("User is is: ", userId);
    console.log("Video path is : ",videoPath)
    return res.status(400).json({error:"UserId and videoPath required"})
  }
  const job = await addVideoJob({userId, videoPath});
  res.json({
    success:true,
    jobId: job.id,
    message:"Video queued for transcoding"
  })
}catch(err){
  console.log("Error : ",err)
}})


export default router;



//queue and worker connected only by "queue name + redis connection"
//api endpoints