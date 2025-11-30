import { Queue } from "bullmq";
import {redis} from "../config/redisConfig.js"

export const myQueue = new Queue("myqueue", {
  connection:redis,
  defaultJobOptions:{
    attempts:5,
    backoff:{type:'exponential', delay:5000},
    removeOnComplete:{age:24*3600, count:1000},
    removeOnFail:{age:7*24*3600}
  }
});

myQueue.on("waiting", () => {
  console.log("Queue is waiting for jobs...");
});
