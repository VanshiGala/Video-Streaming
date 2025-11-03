import AWS from "aws-sdk"
import dotenv from "dotenv"

dotenv.config()

const s3 = new AWS.S3({
  endpoint: process.env.B2_ENDPOINT,
  region: process.env.B2_REGION,
  accessKeyId:process.env.B2_ACCESS_KEY_ID,
  secretAccessKey: process.env.B2_SECRET_ACCESS_KEY,
})
export default s3