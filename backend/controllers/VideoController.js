 import s3 from "../config/s3Config.js";
 import {PutObjectCommand} from "@aws-sdk/client-s3" //used to upload a file to bucket
 import Video from "../models/Video.js";

 export const uploadVideo = async (req, res) => {
 try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const startTime = Date.now();
    
    const key = `uploads/${Date.now()}-${req.file.originalname}`; //unique filename for storage

    //upload parameters
    const params = {
      Bucket: process.env.B2_BUCKET_NAME,
      Key: key, //the path or filename it will be stored as
      Body: req.file.buffer, //buffer -> in-memory storage
      ContentType: req.file.mimetype, //correct filetype handling
    };
    
    //upload to bucket
     const command = new PutObjectCommand(params);
     await s3.send(command); //send to s3 client which uploads obj to bucket

    const savedVideo = await Video.create({
      fileName: key,
    }); //save fileName to DB

    //calculate time to upload
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    res.json({
      message: " Video uploaded successfully to Backblaze B2",
      key:params.Key,
      fileName:savedVideo.fileName,
      videoUrl : `${process.env.B2_ENDPOINT}/${process.env.B2_BUCKET_NAME}/${params.Key}`, //works if public only
      uploadTime: `${duration} seconds`,
      fileSizeMB: (req.file.size / (1024 * 1024)).toFixed(2) + " MB"
    });
  } catch (error) {
    console.error(" Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
};


//ListBucketsCommand -> Lists all buckets in your account
//PutObjectCommand -> Uploads (writes) a file to a specific bucket






