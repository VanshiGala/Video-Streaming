import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    videoUrl : {
        type:String
    },
    fileName : {
        type:String
    },
    createdAt : {
        type:Date,
        default:Date.now
    }
})

 const Video = mongoose.model("Video", VideoSchema)

 export default Video