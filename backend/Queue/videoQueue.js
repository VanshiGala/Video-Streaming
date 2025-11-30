//producer + queue def
import { Queue } from "bullmq";
import { redis } from "../config/redisConfig.js";

export const videoQueue = new Queue("videoQueue",{ //queue -> only stores the jobs
    connection:redis,
    defaultJobOptions: {
    attempts: 3,                      // retry if fail
    backoff: { type: "exponential", delay: 3000 },
    removeOnComplete: { age: 3600 },  // remove after 1 hr
    removeOnFail: { age: 24 * 3600 }  // remove after 1 day
  }
});

//producer() -> creates job and sends to queue -> only adds the job
export const addVideoJob = async({userId, videoPath})=>{
    return await videoQueue.add("transcode-video",{
        userId,
        videoPath
    })
}


//define video-queue ; stores video in queue