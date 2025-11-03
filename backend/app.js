import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import videoRoutes from "./routes/VideoRoute.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/api/videos", videoRoutes);

app.get("/", (req, res) => res.send("Server running"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
