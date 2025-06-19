const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const Document = require("./models/Document");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // or "http://localhost:5173"
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://editoruser:editorpass@cluster0.blpkc2f.mongodb.net/realtime-editor", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get document by ID
app.get("/documents/:id", async (req, res) => {
  const document = await Document.findById(req.params.id);
  res.json(document);
});

// Save document
app.post("/documents/:id", async (req, res) => {
  const { content } = req.body;
  const doc = await Document.findByIdAndUpdate(req.params.id, { content });
  res.json(doc);
});

// Create a new document
app.post("/documents", async (req, res) => {
  const doc = await Document.create({ content: "Start typing..." });
  res.json(doc);
});

// Socket.IO Realtime Communication
io.on("connection", (socket) => {
  console.log("🔌 New user connected:", socket.id);

  socket.on("join-document", (docId) => {
    socket.join(docId);
    socket.docId = docId;
    console.log(`📄 Socket ${socket.id} joined document: ${docId}`);

    socket.on("send-changes", (data) => {
      console.log(`✏️ Changes from ${socket.id}:`, data.slice(0, 10) + "...");
      socket.broadcast.to(docId).emit("receive-changes", data);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(docId, { content: data });
    });
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("🚀 Server running on http://localhost:3001");
});
