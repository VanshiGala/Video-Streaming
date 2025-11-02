import express, { urlencoded } from "express";
import cors from "cors";
import multer from "multer"
import fs from "fs"
import AWS from "aws-sdk"
import dotenv from "dotenv" //for credentials and configurations
// import {S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

dotenv.config() //loads  .env file
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json())

const upload = multer({ storage: multer.memoryStorage() }); //in-memory as buffer

//configure AWS-SDK
const s3 = new AWS.S3({
  endpoint: process.env.B2_ENDPOINT,
  region: process.env.B2_REGION,
  accessKeyId:process.env.B2_ACCESS_KEY_ID,
  secretAccessKey: process.env.B2_SECRET_ACCESS_KEY,
})
// app.post("/upload", upload.single("video"), async (req,res)=>{
//   console.log(req.file, "Incoming file")
//   try{
//     const filepath = req.file.path;
//     const fileContent = fs.readFileSync(filepath);
//     const params = {
//       Bucket: process.env.B2_BUCKET_NAME,
//       Key: req.file.originalname,
//       Body: fileContent,
//       ContentType: req.file.mimetype,
//     }
//     const result = await s3.upload(params).promise();
//     fs.unlinkSync(filepath);
//     res.json({
//       message: "Video uploaded successfully to Backblaze B2",
//       videoUrl: result.Location,
//     });
//   }
//   catch (error) {
//     console.error(" Upload error:", error);
//     res.status(500).json({ error: "Upload failed" });
//   }
// })

app.post("/upload", upload.single("video"), async (req, res) => { //"video" is the key which should be same in frontend form
  console.log(req.file, "Incoming file");
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const startTime = Date.now();

    //upload parameters
    const params = {
      Bucket: process.env.B2_BUCKET_NAME,
      Key: `uploads/${Date.now()}-${req.file.originalname}`, //the path or filename it will be stored as
      Body: req.file.buffer, 
      ContentType: req.file.mimetype,
    };

    const result = await s3.upload(params).promise(); //upload to bucket

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    res.json({
      message: " Video uploaded successfully to Backblaze B2",
      videoUrl: result.Location,
      uploadTime: `${duration} seconds`,
      fileSizeMB: (req.file.size / (1024 * 1024)).toFixed(2) + " MB"
    });
  } catch (error) {
    console.error(" Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.get("/", (req, res) => res.send("Server running"));
const PORT = process.env.PORT || 8000;
app.listen(8000, () => console.log(`Server running on port ${PORT}`));


//the commented route will work with diskstorage only


