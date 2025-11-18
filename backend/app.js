import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import videoRoutes from "./routes/VideoRoute.js";
import connectDB from "./db/db.js";
import userRoutes from "./routes/UserRoute.js"
import cookieParser from "cookie-parser"
import session from "express-session"
import MongoStore from "connect-mongo";

dotenv.config();
connectDB();
const app = express();
app.use((req,res, next) => {
    console.log("Incoming request: ");
    console.log(`req.method: ${req.method}`);
    console.log(`req.headers: ${JSON.stringify(req.headers)}`);
    console.log(`req.url: ${req.url}`);
    console.log(`req.body: ${JSON.stringify(req.body)}`);
    next();
});

// app.use(cors({ origin: "http://localhost:5173" , 
//     credentials:true,
//     allowedHeaders: "Authorization,Content-Type",
//     //allowedHeaders:["Content-Type" , "Authorization"]
// }))

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Authorization", "Content-Type"],
  exposedHeaders: ["Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//app.set("trust proxy", 1)
// app.use(session({
//     secret:process.env.SESSION_SECRET || "super-secret-key",
//     resave:false,
//     secure:false,
//     saveUninitialized: false, 
    //store: MongoStore.create({
      //  mongoUrl:process.env.MONGO_URI
    //}),
    // cookie:{
    //     httpOnly:true,
    //     secure:false,
    //     maxAge: 24 * 60 * 60 * 1000, 
    // }
//}))

// Routes
app.use("/", videoRoutes);
app.use("/",userRoutes)

app.get("/", (req, res) => res.send("Server running"));


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
