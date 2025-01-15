const express = require("express");
const path = require("path");
const jsonServer = require("json-server");
const cors = require("cors");

// Create an Express app
const app = express();

// Enable CORS
app.use(cors());

// Serve static files from Vite build directory
app.use(express.static(path.join(__dirname, "dist")));

// Create a router for json-server
const router = jsonServer.router("data/db.json"); // path to your mock data
const middlewares = jsonServer.defaults();

// Use json-server middlewares
app.use(middlewares);
app.use("/api", router); // Example: all API calls will be routed under /api

// Serve the frontend (Vite) app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

// Listen on a dynamic port (for platforms like Heroku)
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
