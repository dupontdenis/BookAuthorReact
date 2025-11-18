import express from "express";
import mongoose from "mongoose";
import authorRoutes from "./routes/authorRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

// Simple CORS middleware for development (allows requests from Vite dev server)
function allowCors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
}

const app = express();
app.use(express.json());

app.use(allowCors);

// log mongoose connection result
mongoose
  .connect("mongodb://localhost:27017/library")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

// Debug: list registered routes
if (process.env.DEBUG_ROUTES) {
  console.log("Registered routes:");
  app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
      console.log(
        Object.keys(r.route.methods).join(",").toUpperCase(),
        r.route.path
      );
    }
  });
}

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
