import {Worker} from "bullmq"
import {redis} from "../config/redisConfig.js"

const worker = new Worker(
  "myqueue",
  async job => {
    console.log("Processing job:", job.name, job.data);

    if (job.name === "email") {
      console.log("Sending email to:", job.data.to);
      await new Promise(res => setTimeout(res, 3000));
    }
  },
  {
    connection: redis
  }
);

worker.on("ready", () => {
  console.log("Worker connected to Redis");
});

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job.id} failed`, err);
});

