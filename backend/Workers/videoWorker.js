import {Worker} from "bullmq"
import {redis} from "../config/redisConfig.js"

const worker = new Worker("videoQueue", async job=>{ //service
    console.log("Received Job : ",job.id, job.data );
    if (job.name == "transcode-video"){
        const {userId, videoPath} = job.data;

        await new Promise(res => setTimeout(res, 2000));
        console.log(`Video transcoding completed for : ${videoPath}`)
    }
},{connection:redis});

worker.on("ready", () => console.log("Video Worker connected to Redis"));
worker.on("completed", job => console.log(`Job ${job.id} done`));
worker.on("failed", (job, err) => console.log(` Job ${job.id} failed`, err));

//pulls the job from queue and process them
//heavy jobs happen here
//run in separate process so main API stays safe