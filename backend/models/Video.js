import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    title:String,
    description:String,
    author:String
})