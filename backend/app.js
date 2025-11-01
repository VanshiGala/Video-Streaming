import express, { urlencoded } from "express";
import cors from "cors";
import path from "path";
import crypto from "crypto"
import mongoose from "mongoose";
import multer from "multer"
import {GridFsStorage} from "multer-gridfs-storage"
import Grid from "gridfs-stream"
import methodOverride from "method-override"
// import bodyParser from "body-parser";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json())
app.use(urlencoded())
app.use(methodOverride('_method'))

// main().catch(err=> console.log(err)).then(()=>console.log("Connected"))

const mongoURL = 'mongodb://127.0.0.1:27017/Videos'
const conn = mongoose.createConnection(mongoURL)

let gfs
conn.once('open', ()=>{

  //initial stream
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('uploads')
})

//create storage engine
const storage = new GridFsStorage({
  url: mongoURL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });


//@route GET/
//@desc Upload file to DB
app.get("/home", (req, res) => {
  res.send("Hi");
});

app.get('/', (req, res)=>{
  res.send("Running")
})

//@route POST/
//@desc Upload file to DB
app.post('/upload', upload.single('file'), (req,res)=>{
  res.json({file:req.file})
})
app.get('/upload', (req,res)=>{
  res.json(req.file)
})

app.listen(8000, () => console.log("Server running on port 8000"));
