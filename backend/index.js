import express from "express"

import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
dotenv.config()


const app = express()
const PORT = process.env.PORT || 4000






// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())


// logging
if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
} else {
    app.use(morgan("tiny"))
}


app.get("/", (req, res) => {
  res.json({
    message: "API is live",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});



app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.version,
  });
});


app.get("/test", (req, res) => {
  return res.json({ status: 200, message: "API is live" });
});


app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))



