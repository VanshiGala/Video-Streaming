import express from "express";
import cors from "cors";
import multer from "multer";
import {v4 as uuidv4} from 'uuid'
import path from "path"
import fs from "fs"
import {exec} from "child_process"
import {stderr, stdout} from "process"

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + unique);
  },
});
const upload = multer({ storage });


app.post("/uploads", upload.single("myfile"), (req, res) => {
 // res.send(req.file);
 // res.json({ message: "File uploaded successfully!", file: req.file });
  const lessonId = uuidv4()
  const videoPath = req.file.path
  const outputPath = `./uploads/vid/${lessonId}`
  const hlsPath = `${outputPath}/index.m3u8`
  console.log("Hls path ",hlsPath)

  if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive: true})
  }
  const ffmpegPath = "C:/ffmpeg/bin/ffmpeg.exe";
  //const cmd = `ffmpeg -i "${videoPath}" -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 "${hlsPath}"`;
  const cmd = `"${ffmpegPath}" -i "${videoPath}" -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 "${hlsPath}"`;

  exec(cmd, (error, stdout, stderr)=>{
    if (error){
      console.log(`exec error : ${error}`)
    }
    console.log(`stdout : ${stdout}`)
    console.log(`stderr : ${stderr}`)
    const vidUrl = `https://localhost:8000/uploads/vid/${lessonId}/index.m3u8`;

    res.json({message: "Video converted to hls",
      vidUrl: vidUrl,
      lessonId: lessonId
    })
  })
});


app.get("/home", (req, res) => {
  res.send("Hi");
});

app.get('/uploads', (req,res)=>{
  res.send("Uploads")
})
app.listen(8000, () => console.log("Server running on port 8000"));
