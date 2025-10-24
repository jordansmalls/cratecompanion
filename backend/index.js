// server
import express from "express";
import connectDB from "./src/config/db.js";

// middleware
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./src/middleware/error.middleware.js";

// routes
import auth from "./src/routes/auth.routes.js";
import user from "./src/routes/user.routes.js";

connectDB();
const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("tiny"));
}

// routes
app.use("/api/auth", auth);
app.use("/api/user", user);

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

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
