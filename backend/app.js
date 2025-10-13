import express from "express"
import cors from "cors"

const app = express()
app.use(cors({
    origin:"http://localhost:5173"
}))

app.get("/home",(req,res)=>{
    res.send("Hi")
})
app.listen(8000, ()=>{
    console.log("App is listening on port 8000")
})