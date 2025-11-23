// import AWS from "aws-sdk"
import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv"

dotenv.config() //to load parameters from .env file

const s3 = new S3Client({
  endpoint: process.env.B2_ENDPOINT,
  region: process.env.B2_REGION,
  credentials:{ //compulsory
    accessKeyId:process.env.B2_ACCESS_KEY_ID,
    secretAccessKey: process.env.B2_SECRET_ACCESS_KEY,
  }, 
})
export default s3