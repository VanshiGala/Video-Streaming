 import s3 from "../config/s3Config.js";

export const uploadVideo = async (req, res) => {
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
};


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
//the commented route will work with diskstorage only
